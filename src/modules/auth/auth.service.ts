import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../shared/services/hash.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterOwnerDto } from './dto/register-owner.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    return this.createUserWithRole(registerDto, RoleEnum.BARBER);
  }

  async registerOwner(dto: RegisterOwnerDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await this.hashService.hashPassword(dto.password);

    const ownerRole = await this.prisma.role.findUnique({ where: { name: RoleEnum.OWNER } });
    if (!ownerRole) {
      throw new ConflictException('Rol OWNER no encontrado — ejecuta el seed');
    }

    const { user, brand, barbershop } = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: dto.email,
          passwordHash: hashedPassword,
          name: dto.name,
          phoneNumber: dto.phoneNumber ?? '',
          roleId: ownerRole.id,
        },
        select: { id: true, email: true, name: true },
      });

      const brand = await tx.brand.create({
        data: { name: dto.brandName, ownerId: user.id },
        select: { id: true, name: true },
      });

      const barbershop = await tx.barbershop.create({
        data: { name: dto.barbershopName, address: dto.address, brandId: brand.id },
        select: { id: true, name: true, address: true },
      });

      return { user, brand, barbershop };
    });

    const payload = { sub: user.id, email: user.email, role: RoleEnum.OWNER };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Registro exitoso',
      token,
      user: { ...user, role: RoleEnum.OWNER },
      brand,
      barbershop,
    };
  }

  async createUserWithRole(
    dto: RegisterDto,
    role: RoleEnum,
  ) {
    const { email, password, name, phoneNumber } = dto;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await this.hashService.hashPassword(password);

    const roleRecord = await this.prisma.role.findUnique({ where: { name: role } });
    if (!roleRecord) {
      throw new ConflictException('Rol no válido');
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
        phoneNumber: phoneNumber ?? '',
        roleId: roleRecord.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        roleId: true,
        createdAt: true,
      },
    });

    return { message: 'Usuario registrado exitosamente', user };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await this.hashService.comparePassword(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role.name };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
      token,
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: { select: { name: true } },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }
}
