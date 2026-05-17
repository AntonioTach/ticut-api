import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleEnum } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../shared/services/hash.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';

const barberInclude = {
  role: true,
  barbershops: {
    where: { isActive: true },
    include: { barbershop: { select: { id: true, name: true, address: true } } },
  },
} as const;

@Injectable()
export class BarbersService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}

  async create(dto: CreateBarberDto) {
    const { password, barbershopId, ...userData } = dto;
    const hashedPassword = await this.hashService.hashPassword(password);

    const barberRole = await this.prisma.role.findUnique({ where: { name: RoleEnum.BARBER } });

    const barber = await this.prisma.user.create({
      data: { ...userData, passwordHash: hashedPassword, roleId: barberRole.id },
      include: barberInclude,
    });

    if (barbershopId) {
      await this.prisma.barbershopBarber.create({
        data: { userId: barber.id, barbershopId },
      });
    }

    return barber;
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: { role: { name: RoleEnum.BARBER } },
      include: barberInclude,
    });
  }

  async findOne(id: string) {
    const barber = await this.prisma.user.findFirst({
      where: { id, role: { name: RoleEnum.BARBER } },
      include: barberInclude,
    });

    if (!barber) throw new NotFoundException(`Barbero ${id} no encontrado`);
    return barber;
  }

  async update(id: string, dto: UpdateBarberDto) {
    const { password, ...updateData } = dto;
    const payload: any = { ...updateData };

    if (password) {
      payload.passwordHash = await this.hashService.hashPassword(password);
    }

    return this.prisma.user.update({
      where: { id },
      data: payload,
      include: barberInclude,
    });
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Barbero eliminado' };
  }

  async findByBarbershop(barbershopId: string) {
    return this.prisma.barbershopBarber.findMany({
      where: { barbershopId, isActive: true },
      include: { user: { include: { role: true } } },
    });
  }
}
