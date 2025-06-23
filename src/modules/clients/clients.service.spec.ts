import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { NotFoundException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    client: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const createClientDto: CreateClientDto = {
        barbershopId: 'barbershop-id',
        name: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        email: 'john@example.com',
        notes: 'Test client',
      };

      const expectedClient = {
        id: 'client-id',
        ...createClientDto,
      };

      mockPrismaService.client.create.mockResolvedValue(expectedClient);

      const result = await service.create(createClientDto);

      expect(mockPrismaService.client.create).toHaveBeenCalledWith({
        data: createClientDto,
      });
      expect(result).toEqual(expectedClient);
    });
  });

  describe('findAll', () => {
    it('should return all clients for a barbershop', async () => {
      const barbershopId = 'barbershop-id';
      const expectedClients = [
        {
          id: 'client-1',
          barbershopId,
          name: 'John',
          lastname: 'Doe',
          phone: '1234567890',
        },
        {
          id: 'client-2',
          barbershopId,
          name: 'Jane',
          lastname: 'Smith',
          phone: '0987654321',
        },
      ];

      mockPrismaService.client.findMany.mockResolvedValue(expectedClients);

      const result = await service.findAll(barbershopId);

      expect(mockPrismaService.client.findMany).toHaveBeenCalledWith({
        where: { barbershopId },
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(expectedClients);
    });
  });

  describe('findOne', () => {
    it('should return a client by id', async () => {
      const id = 'client-id';
      const barbershopId = 'barbershop-id';
      const expectedClient = {
        id,
        barbershopId,
        name: 'John',
        lastname: 'Doe',
        phone: '1234567890',
      };

      mockPrismaService.client.findFirst.mockResolvedValue(expectedClient);

      const result = await service.findOne(id, barbershopId);

      expect(mockPrismaService.client.findFirst).toHaveBeenCalledWith({
        where: { id, barbershopId },
      });
      expect(result).toEqual(expectedClient);
    });

    it('should throw NotFoundException when client not found', async () => {
      const id = 'client-id';
      const barbershopId = 'barbershop-id';

      mockPrismaService.client.findFirst.mockResolvedValue(null);

      await expect(service.findOne(id, barbershopId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const id = 'client-id';
      const barbershopId = 'barbershop-id';
      const updateClientDto: UpdateClientDto = {
        name: 'Updated Name',
        phone: '9876543210',
      };

      const existingClient = {
        id,
        barbershopId,
        name: 'John',
        lastname: 'Doe',
        phone: '1234567890',
      };

      const updatedClient = {
        ...existingClient,
        ...updateClientDto,
      };

      mockPrismaService.client.findFirst.mockResolvedValue(existingClient);
      mockPrismaService.client.update.mockResolvedValue(updatedClient);

      const result = await service.update(id, barbershopId, updateClientDto);

      expect(mockPrismaService.client.update).toHaveBeenCalledWith({
        where: { id },
        data: updateClientDto,
      });
      expect(result).toEqual(updatedClient);
    });
  });

  describe('remove', () => {
    it('should delete a client', async () => {
      const id = 'client-id';
      const barbershopId = 'barbershop-id';
      const existingClient = {
        id,
        barbershopId,
        name: 'John',
        lastname: 'Doe',
        phone: '1234567890',
      };

      mockPrismaService.client.findFirst.mockResolvedValue(existingClient);
      mockPrismaService.client.delete.mockResolvedValue(existingClient);

      await service.remove(id, barbershopId);

      expect(mockPrismaService.client.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('findByPhone', () => {
    it('should return a client by phone number', async () => {
      const phone = '1234567890';
      const barbershopId = 'barbershop-id';
      const expectedClient = {
        id: 'client-id',
        barbershopId,
        name: 'John',
        lastname: 'Doe',
        phone,
      };

      mockPrismaService.client.findFirst.mockResolvedValue(expectedClient);

      const result = await service.findByPhone(phone, barbershopId);

      expect(mockPrismaService.client.findFirst).toHaveBeenCalledWith({
        where: { phone, barbershopId },
      });
      expect(result).toEqual(expectedClient);
    });

    it('should return null when client not found by phone', async () => {
      const phone = '1234567890';
      const barbershopId = 'barbershop-id';

      mockPrismaService.client.findFirst.mockResolvedValue(null);

      const result = await service.findByPhone(phone, barbershopId);

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a client by email', async () => {
      const email = 'john@example.com';
      const barbershopId = 'barbershop-id';
      const expectedClient = {
        id: 'client-id',
        barbershopId,
        name: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        email,
      };

      mockPrismaService.client.findFirst.mockResolvedValue(expectedClient);

      const result = await service.findByEmail(email, barbershopId);

      expect(mockPrismaService.client.findFirst).toHaveBeenCalledWith({
        where: { email, barbershopId },
      });
      expect(result).toEqual(expectedClient);
    });

    it('should return null when client not found by email', async () => {
      const email = 'john@example.com';
      const barbershopId = 'barbershop-id';

      mockPrismaService.client.findFirst.mockResolvedValue(null);

      const result = await service.findByEmail(email, barbershopId);

      expect(result).toBeNull();
    });
  });
}); 