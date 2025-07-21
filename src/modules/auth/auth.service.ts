import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../shared/services/hash.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, phoneNumber, role } = registerDto;
    console.log(role);
    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await this.hashService.hashPassword(password);

    // Buscar el roleId correspondiente
    const roleName = role as unknown as RoleEnum;
    console.log(roleName);  
    const roleRecord = await this.prisma.role.findUnique({
      where: { name: roleName },
    });
    if (!roleRecord) {
      throw new ConflictException('Rol no válido');
    }

    // Crear el usuario
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
        phoneNumber: phoneNumber || '',
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

    return {
      message: 'Usuario registrado exitosamente',
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar el usuario
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await this.hashService.comparePassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token JWT
    const payload = { email: user.email, sub: user.id, roleId: user.roleId };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roleId: user.roleId,
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
        roleId: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }
}
