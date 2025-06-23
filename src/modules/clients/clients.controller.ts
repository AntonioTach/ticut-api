import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../core/enums/role.enum';

@ApiTags('clients')
@ApiBearerAuth('JWT-auth')
@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Crear un nuevo cliente',
    description: 'Crea un nuevo cliente en la barbería del usuario autenticado',
  })
  @ApiBody({
    type: CreateClientDto,
    description: 'Datos del cliente a crear',
  })
  @ApiResponse({
    status: 201,
    description: 'Cliente creado exitosamente',
    type: Client,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async create(@Body() createClientDto: CreateClientDto, @Request() req) {
    const barbershopId = req.user.barbershopId;
    const client = await this.clientsService.create({
      ...createClientDto,
      barbershopId,
    });
    return client;
  }

  @Get()
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Obtener todos los clientes',
    description: 'Obtiene la lista de todos los clientes de la barbería',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes obtenida exitosamente',
    type: [Client],
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async findAll(@Request() req) {
    const barbershopId = req.user.barbershopId;
    const clients = await this.clientsService.findAll(barbershopId);
    return clients;
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Obtener un cliente por ID',
    description: 'Obtiene los detalles de un cliente específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado exitosamente',
    type: Client,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async findOne(@Param('id') id: string, @Request() req) {
    const barbershopId = req.user.barbershopId;
    const client = await this.clientsService.findOne(id, barbershopId);
    return client;
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Actualizar un cliente',
    description: 'Actualiza los datos de un cliente existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdateClientDto,
    description: 'Datos a actualizar del cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado exitosamente',
    type: Client,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Request() req,
  ) {
    const barbershopId = req.user.barbershopId;
    const client = await this.clientsService.update(
      id,
      barbershopId,
      updateClientDto,
    );
    return client;
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.BARBER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un cliente',
    description: 'Elimina un cliente de la barbería',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Cliente eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async remove(@Param('id') id: string, @Request() req) {
    const barbershopId = req.user.barbershopId;
    await this.clientsService.remove(id, barbershopId);
  }

  @Get('search/phone/:phone')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Buscar cliente por teléfono',
    description: 'Busca un cliente por su número de teléfono',
  })
  @ApiParam({
    name: 'phone',
    description: 'Número de teléfono del cliente',
    example: '1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado exitosamente',
    type: Client,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async findByPhone(@Param('phone') phone: string, @Request() req) {
    const barbershopId = req.user.barbershopId;
    const client = await this.clientsService.findByPhone(phone, barbershopId);
    return client;
  }

  @Get('search/email/:email')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Buscar cliente por email',
    description: 'Busca un cliente por su dirección de email',
  })
  @ApiParam({
    name: 'email',
    description: 'Email del cliente',
    example: 'juan@example.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado exitosamente',
    type: Client,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async findByEmail(@Param('email') email: string, @Request() req) {
    const barbershopId = req.user.barbershopId;
    const client = await this.clientsService.findByEmail(email, barbershopId);
    return client;
  }

  @Get('admin/test')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Prueba del módulo',
    description: 'Endpoint de prueba para verificar que el módulo funciona correctamente',
  })
  @ApiResponse({
    status: 200,
    description: 'Módulo funcionando correctamente',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Clients module is working correctly',
        },
      },
    },
  })
  async test() {
    return { message: 'Clients module is working correctly' };
  }
} 