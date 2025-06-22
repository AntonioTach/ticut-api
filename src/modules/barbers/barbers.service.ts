import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { HashService } from '../shared/services/hash.service';

@Injectable()
export class BarbersService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}

  async create(createBarberDto: CreateBarberDto) {
    const { password, ...userData } = createBarberDto;
    const hashedPassword = await this.hashService.hashPassword(password);

    const barber = await this.prisma.user.create({
      data: {
        ...userData,
        passwordHash: hashedPassword,
        roleId: 2, // Role BARBER
      },
      include: {
        role: true,
        barbershop: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    return barber;
  }

  async findAll() {
    const barbers = await this.prisma.user.findMany({
      where: {
        roleId: 2, // Role BARBER
      },
      include: {
        role: true,
        barbershop: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    return barbers;
  }

  async findOne(id: string) {
    const barber = await this.prisma.user.findFirst({
      where: {
        id,
        roleId: 2, // Role BARBER
      },
      include: {
        role: true,
        barbershop: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    if (!barber) {
      throw new NotFoundException(`Barbero con ID ${id} no encontrado`);
    }

    return barber;
  }

  async update(id: string, updateBarberDto: UpdateBarberDto) {
    const { password, ...updateData } = updateBarberDto;

    const updatePayload: any = { ...updateData };

    if (password) {
      updatePayload.passwordHash = await this.hashService.hashPassword(password);
    }

    const barber = await this.prisma.user.update({
      where: { id },
      data: updatePayload,
      include: {
        role: true,
        barbershop: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    return barber;
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'Barbero eliminado exitosamente' };
  }

  async findByBarbershop(barbershopId: string) {
    const barbers = await this.prisma.user.findMany({
      where: {
        barbershopId,
        roleId: 2, // Role BARBER
      },
      include: {
        role: true,
      },
    });

    return barbers;
  }
}
