import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

describe('ServicesController', () => {
  let controller: ServicesController;
  let service: ServicesService;

  const mockServicesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByBarbershop: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    toggleActive: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: mockServicesService,
        },
      ],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
    service = module.get<ServicesService>(ServicesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockServicesService.create.mockResolvedValue(expectedService);

      const actualResult = await controller.create(inputCreateServiceDto);

      expect(mockServicesService.create).toHaveBeenCalledWith(
        inputCreateServiceDto,
      );
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

      mockServicesService.findAll.mockResolvedValue(expectedServices);

      const actualResult = await controller.findAll();

      expect(mockServicesService.findAll).toHaveBeenCalledWith(undefined);
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

      mockServicesService.findAll.mockResolvedValue(expectedServices);

      const actualResult = await controller.findAll(barbershopId);

      expect(mockServicesService.findAll).toHaveBeenCalledWith(barbershopId);
      expect(actualResult).toEqual(expectedServices);
    });
  });

  describe('findByBarbershop', () => {
    it('should return services for a specific barbershop', async () => {
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

      mockServicesService.findByBarbershop.mockResolvedValue(expectedServices);

      const actualResult = await controller.findByBarbershop(barbershopId);

      expect(mockServicesService.findByBarbershop).toHaveBeenCalledWith(
        barbershopId,
      );
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

      mockServicesService.findOne.mockResolvedValue(expectedService);

      const actualResult = await controller.findOne(serviceId);

      expect(mockServicesService.findOne).toHaveBeenCalledWith(serviceId);
      expect(actualResult).toEqual(expectedService);
    });
  });

  describe('update', () => {
    it('should update a service', async () => {
      const serviceId = 'service-id';
      const inputUpdateServiceDto: UpdateServiceDto = {
        name: 'Updated Haircut',
        price: 30.0,
      };

      const updatedService = {
        id: 'service-id',
        barbershopId: 'barbershop-id',
        name: 'Updated Haircut',
        price: 30.0,
        durationMinutes: 30,
        active: true,
      };

      mockServicesService.update.mockResolvedValue(updatedService);

      const actualResult = await controller.update(
        serviceId,
        inputUpdateServiceDto,
      );

      expect(mockServicesService.update).toHaveBeenCalledWith(
        serviceId,
        inputUpdateServiceDto,
      );
      expect(actualResult).toEqual(updatedService);
    });
  });

  describe('toggleActive', () => {
    it('should toggle service active status', async () => {
      const serviceId = 'service-id';
      const toggledService = {
        id: 'service-id',
        barbershopId: 'barbershop-id',
        name: 'Haircut',
        price: 25.0,
        durationMinutes: 30,
        active: false,
      };

      mockServicesService.toggleActive.mockResolvedValue(toggledService);

      const actualResult = await controller.toggleActive(serviceId);

      expect(mockServicesService.toggleActive).toHaveBeenCalledWith(serviceId);
      expect(actualResult).toEqual(toggledService);
    });
  });

  describe('remove', () => {
    it('should delete a service', async () => {
      const serviceId = 'service-id';

      mockServicesService.remove.mockResolvedValue(undefined);

      const actualResult = await controller.remove(serviceId);

      expect(mockServicesService.remove).toHaveBeenCalledWith(serviceId);
      expect(actualResult).toBeUndefined();
    });
  });

  describe('test', () => {
    it('should return test message', async () => {
      const expectedMessage = { message: 'Services module is working correctly' };

      const actualResult = await controller.test();

      expect(actualResult).toEqual(expectedMessage);
    });
  });
}); 