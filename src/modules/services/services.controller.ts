import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../core/enums/role.enum';
import { Public } from '../core/decorators/public.decorator';

@ApiTags('services')
@ApiBearerAuth('JWT-auth')
@Controller('services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Crear un nuevo servicio',
    description: 'Crea un nuevo servicio en la barbería',
  })
  @ApiBody({
    type: CreateServiceDto,
    description: 'Datos del servicio a crear',
  })
  @ApiResponse({
    status: 201,
    description: 'Servicio creado exitosamente',
    type: Service,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Obtener todos los servicios',
    description: 'Obtiene la lista de todos los servicios activos',
  })
  @ApiQuery({
    name: 'barbershopId',
    description: 'ID de la barbería para filtrar servicios',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de servicios obtenida exitosamente',
    type: [Service],
  })
  async findAll(@Query('barbershopId') barbershopId?: string) {
    return this.servicesService.findAll(barbershopId);
  }

  @Get('barbershop/:barbershopId')
  @Public()
  @ApiOperation({
    summary: 'Obtener servicios por barbería',
    description: 'Obtiene todos los servicios de una barbería específica',
  })
  @ApiParam({
    name: 'barbershopId',
    description: 'ID de la barbería',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicios de la barbería obtenidos exitosamente',
    type: [Service],
  })
  @ApiResponse({
    status: 404,
    description: 'Barbería no encontrada',
  })
  async findByBarbershop(@Param('barbershopId') barbershopId: string) {
    return this.servicesService.findByBarbershop(barbershopId);
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: 'Obtener un servicio por ID',
    description: 'Obtiene los detalles de un servicio específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del servicio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio encontrado exitosamente',
    type: Service,
  })
  @ApiResponse({
    status: 404,
    description: 'Servicio no encontrado',
  })
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Actualizar un servicio',
    description: 'Actualiza los datos de un servicio existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del servicio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdateServiceDto,
    description: 'Datos a actualizar del servicio',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio actualizado exitosamente',
    type: Service,
  })
  @ApiResponse({
    status: 404,
    description: 'Servicio no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Patch(':id/toggle-active')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Activar/desactivar servicio',
    description: 'Cambia el estado activo/inactivo de un servicio',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del servicio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del servicio cambiado exitosamente',
    type: Service,
  })
  @ApiResponse({
    status: 404,
    description: 'Servicio no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  async toggleActive(@Param('id') id: string) {
    return this.servicesService.toggleActive(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.BARBER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un servicio',
    description: 'Elimina un servicio del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del servicio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Servicio eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Servicio no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  async remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  @Get('admin/test')
  @Public()
  @ApiOperation({
    summary: 'Prueba del módulo de servicios',
    description: 'Endpoint de prueba para verificar que el módulo funciona',
  })
  @ApiResponse({
    status: 200,
    description: 'Módulo funcionando correctamente',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Services module is working correctly',
        },
      },
    },
  })
  async test() {
    return { message: 'Services module is working correctly' };
  }
} 