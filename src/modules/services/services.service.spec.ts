import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { NotFoundException } from '@nestjs/common';

describe('ServicesService', () => {
  let service: ServicesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    service: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new service', async () => {
      const inputCreateServiceDto: CreateServiceDto = {
        barbershopId: 'barbershop-id',
        name: 'Haircut',
        description: 'Basic haircut service',
        price: 25.0,
        durationMinutes: 30,
        active: true,
        imageUrl: 'https://example.com/image.jpg',
      };

      const expectedService = {
        id: 'service-id',
        barbershopId: 'barbershop-id',
        name: 'Haircut',
        description: 'Basic haircut service',
        price: 25.0,
        durationMinutes: 30,
        active: true,
        imageUrl: 'https://example.com/image.jpg',
      };

      mockPrismaService.service.create.mockResolvedValue(expectedService);

      const actualResult = await service.create(inputCreateServiceDto);

      expect(mockPrismaService.service.create).toHaveBeenCalledWith({
        data: inputCreateServiceDto,
      });
      expect(actualResult).toEqual(expectedService);
    });
  });

  describe('findAll', () => {
    it('should return all services when no barbershopId is provided', async () => {
      const expectedServices = [
        {
          id: 'service-1',
          barbershopId: 'barbershop-1',
          name: 'Haircut',
          price: 25.0,
          durationMinutes: 30,
          active: true,
        },
        {
          id: 'service-2',
          barbershopId: 'barbershop-2',
          name: 'Beard Trim',
          price: 15.0,
          durationMinutes: 20,
          active: true,
        },
      ];

      mockPrismaService.service.findMany.mockResolvedValue(expectedServices);

      const actualResult = await service.findAll();

      expect(mockPrismaService.service.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { name: 'asc' },
      });
      expect(actualResult).toEqual(expectedServices);
    });

    it('should return services filtered by barbershopId', async () => {
      const barbershopId = 'barbershop-id';
      const expectedServices = [
        {
          id: 'service-1',
          barbershopId: 'barbershop-id',
          name: 'Haircut',
          price: 25.0,
          durationMinutes: 30,
          active: true,
        },
      ];

      mockPrismaService.service.findMany.mockResolvedValue(expectedServices);

      const actualResult = await service.findAll(barbershopId);

      expect(mockPrismaService.service.findMany).toHaveBeenCalledWith({
        where: { barbershopId },
        orderBy: { name: 'asc' },
      });
      expect(actualResult).toEqual(expectedServices);
    });
  });

  describe('findOne', () => {
    it('should return a service by id', async () => {
      const serviceId = 'service-id';
      const expectedService = {
        id: 'service-id',
        barbershopId: 'barbershop-id',
        name: 'Haircut',
        price: 25.0,
        durationMinutes: 30,
        active: true,
      };

      mockPrismaService.service.findUnique.mockResolvedValue(expectedService);

      const actualResult = await service.findOne(serviceId);

      expect(mockPrismaService.service.findUnique).toHaveBeenCalledWith({
        where: { id: serviceId },
      });
      expect(actualResult).toEqual(expectedService);
    });

    it('should throw NotFoundException when service is not found', async () => {
      const serviceId = 'non-existent-id';

      mockPrismaService.service.findUnique.mockResolvedValue(null);

      await expect(service.findOne(serviceId)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.service.findUnique).toHaveBeenCalledWith({
        where: { id: serviceId },
      });
    });
  });

  describe('update', () => {
    it('should update a service', async () => {
      const serviceId = 'service-id';
      const inputUpdateServiceDto: UpdateServiceDto = {
        name: 'Updated Haircut',
        price: 30.0,
      };

      const existingService = {
        id: 'service-id',
        barbershopId: 'barbershop-id',
        name: 'Haircut',
        price: 25.0,
        durationMinutes: 30,
        active: true,
      };

      const updatedService = {
        ...existingService,
        ...inputUpdateServiceDto,
      };

      mockPrismaService.service.findUnique.mockResolvedValue(existingService);
      mockPrismaService.service.update.mockResolvedValue(updatedService);

      const actualResult = await service.update(serviceId, inputUpdateServiceDto);

      expect(mockPrismaService.service.findUnique).toHaveBeenCalledWith({
        where: { id: serviceId },
      });
      expect(mockPrismaService.service.update).toHaveBeenCalledWith({
        where: { id: serviceId },
        data: inputUpdateServiceDto,
      });
      expect(actualResult).toEqual(updatedService);
    });

    it('should throw NotFoundException when service to update is not found', async () => {
      const serviceId = 'non-existent-id';
      const inputUpdateServiceDto: UpdateServiceDto = {
        name: 'Updated Haircut',
      };

      mockPrismaService.service.findUnique.mockResolvedValue(null);

      await expect(
        service.update(serviceId, inputUpdateServiceDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a service', async () => {
      const serviceId = 'service-id';
      const existingService = {
        id: 'service-id',
        barbershopId: 'barbershop-id',
        name: 'Haircut',
        price: 25.0,
        durationMinutes: 30,
        active: true,
      };

      mockPrismaService.service.findUnique.mockResolvedValue(existingService);
      mockPrismaService.service.delete.mockResolvedValue(existingService);

      await service.remove(serviceId);

      expect(mockPrismaService.service.findUnique).toHaveBeenCalledWith({
        where: { id: serviceId },
      });
      expect(mockPrismaService.service.delete).toHaveBeenCalledWith({
        where: { id: serviceId },
      });
    });

    it('should throw NotFoundException when service to delete is not found', async () => {
      const serviceId = 'non-existent-id';

      mockPrismaService.service.findUnique.mockResolvedValue(null);

      await expect(service.remove(serviceId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('toggleActive', () => {
    it('should toggle service active status from true to false', async () => {
      const serviceId = 'service-id';
      const existingService = {
        id: 'service-id',
        barbershopId: 'barbershop-id',
        name: 'Haircut',
        price: 25.0,
        durationMinutes: 30,
        active: true,
      };

      const toggledService = {
        ...existingService,
        active: false,
      };

      mockPrismaService.service.findUnique.mockResolvedValue(existingService);
      mockPrismaService.service.update.mockResolvedValue(toggledService);

      const actualResult = await service.toggleActive(serviceId);

      expect(mockPrismaService.service.findUnique).toHaveBeenCalledWith({
        where: { id: serviceId },
      });
      expect(mockPrismaService.service.update).toHaveBeenCalledWith({
        where: { id: serviceId },
        data: { active: false },
      });
      expect(actualResult).toEqual(toggledService);
    });

    it('should toggle service active status from false to true', async () => {
      const serviceId = 'service-id';
      const existingService = {
        id: 'service-id',
        barbershopId: 'barbershop-id',
        name: 'Haircut',
        price: 25.0,
        durationMinutes: 30,
        active: false,
      };

      const toggledService = {
        ...existingService,
        active: true,
      };

      mockPrismaService.service.findUnique.mockResolvedValue(existingService);
      mockPrismaService.service.update.mockResolvedValue(toggledService);

      const actualResult = await service.toggleActive(serviceId);

      expect(mockPrismaService.service.findUnique).toHaveBeenCalledWith({
        where: { id: serviceId },
      });
      expect(mockPrismaService.service.update).toHaveBeenCalledWith({
        where: { id: serviceId },
        data: { active: true },
      });
      expect(actualResult).toEqual(toggledService);
    });

    it('should throw NotFoundException when service to toggle is not found', async () => {
      const serviceId = 'non-existent-id';

      mockPrismaService.service.findUnique.mockResolvedValue(null);

      await expect(service.toggleActive(serviceId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
}); 