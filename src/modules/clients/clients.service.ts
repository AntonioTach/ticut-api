import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = await this.prisma.client.create({
      data: createClientDto,
    });
    return client;
  }

  async findAll(barbershopId: string): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      where: { barbershopId },
      orderBy: { name: 'asc' },
    });
    return clients;
  }

  async findOne(id: string, barbershopId: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { id, barbershopId },
    });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return client;
  }

  async update(
    id: string,
    barbershopId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    await this.findOne(id, barbershopId);

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });

    return updatedClient;
  }

  async remove(id: string, barbershopId: string): Promise<void> {
    await this.findOne(id, barbershopId);

    await this.prisma.client.delete({
      where: { id },
    });
  }

  async findByPhone(phone: string, barbershopId: string): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: { phone, barbershopId },
    });
    return client;
  }

  async findByEmail(email: string, barbershopId: string): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: { email, barbershopId },
    });
    return client;
  }
} 