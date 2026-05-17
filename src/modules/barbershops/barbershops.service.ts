import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarbershopDto } from './dto/create-barbershop.dto';
import { UpdateBarbershopDto } from './dto/update-barbershop.dto';

@Injectable()
export class BarbershopsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBarbershopDto) {
    const brand = await this.prisma.brand.findUnique({
      where: { id: dto.brandId },
      select: { ownerId: true },
    });

    return this.prisma.$transaction(async (tx) => {
      const barbershop = await tx.barbershop.create({
        data: dto,
        include: { brand: true },
      });

      await tx.barbershopBarber.create({
        data: { userId: brand.ownerId, barbershopId: barbershop.id },
      });

      return barbershop;
    });
  }

  async findAll() {
    return this.prisma.barbershop.findMany({ include: { brand: true } });
  }

  async findOne(id: string) {
    const barbershop = await this.prisma.barbershop.findUnique({
      where: { id },
      include: { brand: true, barbers: { include: { user: true } } },
    });
    if (!barbershop) {
      throw new NotFoundException(`Barbershop ${id} no encontrada`);
    }
    return barbershop;
  }

  async findByBrand(brandId: string) {
    return this.prisma.barbershop.findMany({
      where: { brandId },
      include: { barbers: { include: { user: true } } },
    });
  }

  async update(id: string, dto: UpdateBarbershopDto) {
    return this.prisma.barbershop.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.barbershop.delete({ where: { id } });
    return { message: 'Barbershop eliminada' };
  }
}
