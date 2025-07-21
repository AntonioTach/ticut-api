import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarbershopDto } from './dto/create-barbershop.dto';
import { UpdateBarbershopDto } from './dto/update-barbershop.dto';
import { CreateBarbershopWithOwnerDto } from './dto/create-barbershop-with-owner.dto';
import { Role } from '../core/enums/role.enum';
import { HashService } from '../shared/services/hash.service';
import { AuthService } from '../auth/auth.service';
import { RoleEnum } from '@prisma/client';
import { toRoleEnum } from '../core/enums/role.enum';

@Injectable()
export class BarbershopsService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
    private authService: AuthService,
  ) {}

  async create(createBarbershopDto: CreateBarbershopDto) {
    return this.prisma.barbershop.create({
      data: createBarbershopDto,
    });
  }

  async findAll() {
    return this.prisma.barbershop.findMany();
  }

  async findOne(id: string) {
    const barbershop = await this.prisma.barbershop.findUnique({
      where: { id },
    });
    if (!barbershop) {
      throw new NotFoundException(`Barbershop with ID ${id} not found`);
    }
    return barbershop;
  }

  async update(id: string, updateBarbershopDto: UpdateBarbershopDto) {
    return this.prisma.barbershop.update({
      where: { id },
      data: updateBarbershopDto,
    });
  }

  async remove(id: string) {
    await this.prisma.barbershop.delete({
      where: { id },
    });
    return { message: 'Barbershop deleted successfully' };
  }

  async createWithOwner(dto: CreateBarbershopWithOwnerDto) {
    // 1. Crear usuario propietario
    const ownerDto = { ...dto.owner, role: toRoleEnum(Role.OWNER) };
    const { user: owner } = await this.authService.register(ownerDto);

    // 2. Crear barbería con ownerId
    const barbershop = await this.prisma.barbershop.create({
      data: {
        ...dto.barbershop,
        ownerId: owner.id,
      },
    });

    // 3. Asociar el usuario con la barbería (barbershopId)
    await this.prisma.user.update({
      where: { id: owner.id },
      data: { barbershopId: barbershop.id },
    });

    // 4. Retornar ambos objetos
    return { owner: { ...owner, barbershopId: barbershop.id }, barbershop };
  }
}
