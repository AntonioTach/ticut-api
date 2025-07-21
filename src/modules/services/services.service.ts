import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = await this.prisma.service.create({
      data: {
        barbershopId: createServiceDto.barbershopId,
        name: createServiceDto.name,
        description: createServiceDto.description,
        price: createServiceDto.price,
        durationMinutes: createServiceDto.durationMinutes,
        active: createServiceDto.active ?? true,
        imageUrl: createServiceDto.imageUrl,
      },
    });

    return this.mapToEntity(service);
  }

  async findAll(barbershopId?: string): Promise<Service[]> {
    const where = barbershopId ? { barbershopId } : {};

    const services = await this.prisma.service.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    return services.map((service) => this.mapToEntity(service));
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return this.mapToEntity(service);
  }

  async findByBarbershop(barbershopId: string): Promise<Service[]> {
    const services = await this.prisma.service.findMany({
      where: { barbershopId },
      orderBy: { name: 'asc' },
    });

    return services.map((service) => this.mapToEntity(service));
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const existingService = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    const service = await this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });

    return this.mapToEntity(service);
  }

  async remove(id: string): Promise<void> {
    const existingService = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    await this.prisma.service.delete({
      where: { id },
    });
  }

  async toggleActive(id: string): Promise<Service> {
    const existingService = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    const service = await this.prisma.service.update({
      where: { id },
      data: { active: !existingService.active },
    });

    return this.mapToEntity(service);
  }

  private mapToEntity(prismaService: any): Service {
    return {
      id: prismaService.id,
      barbershopId: prismaService.barbershopId,
      name: prismaService.name,
      description: prismaService.description,
      price: Number(prismaService.price),
      durationMinutes: prismaService.durationMinutes,
      active: prismaService.active,
      imageUrl: prismaService.imageUrl,
      createdAt: prismaService.createdAt,
      updatedAt: prismaService.updatedAt,
    };
  }
} 