import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  const mockClientsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByPhone: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: mockClientsService,
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      const mockRequest = {
        user: { barbershopId: 'barbershop-id' },
      };

      mockClientsService.create.mockResolvedValue(expectedClient);

      const result = await controller.create(createClientDto, mockRequest);

      expect(mockClientsService.create).toHaveBeenCalledWith({
        ...createClientDto,
        barbershopId: mockRequest.user.barbershopId,
      });
      expect(result).toEqual(expectedClient);
    });
  });

  describe('findAll', () => {
    it('should return all clients for a barbershop', async () => {
      const mockRequest = {
        user: { barbershopId: 'barbershop-id' },
      };

      const expectedClients = [
        {
          id: 'client-1',
          barbershopId: 'barbershop-id',
          name: 'John',
          lastname: 'Doe',
          phone: '1234567890',
        },
        {
          id: 'client-2',
          barbershopId: 'barbershop-id',
          name: 'Jane',
          lastname: 'Smith',
          phone: '0987654321',
        },
      ];

      mockClientsService.findAll.mockResolvedValue(expectedClients);

      const result = await controller.findAll(mockRequest);

      expect(mockClientsService.findAll).toHaveBeenCalledWith(
        mockRequest.user.barbershopId,
      );
      expect(result).toEqual(expectedClients);
    });
  });

  describe('findOne', () => {
    it('should return a client by id', async () => {
      const id = 'client-id';
      const mockRequest = {
        user: { barbershopId: 'barbershop-id' },
      };

      const expectedClient = {
        id,
        barbershopId: 'barbershop-id',
        name: 'John',
        lastname: 'Doe',
        phone: '1234567890',
      };

      mockClientsService.findOne.mockResolvedValue(expectedClient);

      const result = await controller.findOne(id, mockRequest);

      expect(mockClientsService.findOne).toHaveBeenCalledWith(
        id,
        mockRequest.user.barbershopId,
      );
      expect(result).toEqual(expectedClient);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const id = 'client-id';
      const updateClientDto: UpdateClientDto = {
        name: 'Updated Name',
        phone: '9876543210',
      };

      const mockRequest = {
        user: { barbershopId: 'barbershop-id' },
      };

      const updatedClient = {
        id,
        barbershopId: 'barbershop-id',
        name: 'Updated Name',
        lastname: 'Doe',
        phone: '9876543210',
      };

      mockClientsService.update.mockResolvedValue(updatedClient);

      const result = await controller.update(id, updateClientDto, mockRequest);

      expect(mockClientsService.update).toHaveBeenCalledWith(
        id,
        mockRequest.user.barbershopId,
        updateClientDto,
      );
      expect(result).toEqual(updatedClient);
    });
  });

  describe('remove', () => {
    it('should delete a client', async () => {
      const id = 'client-id';
      const mockRequest = {
        user: { barbershopId: 'barbershop-id' },
      };

      mockClientsService.remove.mockResolvedValue(undefined);

      await controller.remove(id, mockRequest);

      expect(mockClientsService.remove).toHaveBeenCalledWith(
        id,
        mockRequest.user.barbershopId,
      );
    });
  });

  describe('findByPhone', () => {
    it('should return a client by phone number', async () => {
      const phone = '1234567890';
      const mockRequest = {
        user: { barbershopId: 'barbershop-id' },
      };

      const expectedClient = {
        id: 'client-id',
        barbershopId: 'barbershop-id',
        name: 'John',
        lastname: 'Doe',
        phone,
      };

      mockClientsService.findByPhone.mockResolvedValue(expectedClient);

      const result = await controller.findByPhone(phone, mockRequest);

      expect(mockClientsService.findByPhone).toHaveBeenCalledWith(
        phone,
        mockRequest.user.barbershopId,
      );
      expect(result).toEqual(expectedClient);
    });
  });

  describe('findByEmail', () => {
    it('should return a client by email', async () => {
      const email = 'john@example.com';
      const mockRequest = {
        user: { barbershopId: 'barbershop-id' },
      };

      const expectedClient = {
        id: 'client-id',
        barbershopId: 'barbershop-id',
        name: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        email,
      };

      mockClientsService.findByEmail.mockResolvedValue(expectedClient);

      const result = await controller.findByEmail(email, mockRequest);

      expect(mockClientsService.findByEmail).toHaveBeenCalledWith(
        email,
        mockRequest.user.barbershopId,
      );
      expect(result).toEqual(expectedClient);
    });
  });

  describe('test', () => {
    it('should return test message', async () => {
      const expectedMessage = { message: 'Clients module is working correctly' };

      const result = await controller.test();

      expect(result).toEqual(expectedMessage);
    });
  });
}); 