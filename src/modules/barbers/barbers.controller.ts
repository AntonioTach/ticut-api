import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { BarbersService } from './barbers.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { Barber } from './entities/barber.entity';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../core/enums/role.enum';

@ApiTags('barbers')
@ApiBearerAuth('JWT-auth')
@Controller('barbers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BarbersController {
  constructor(private readonly barbersService: BarbersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Crear un nuevo barbero',
    description: 'Crea un nuevo barbero en el sistema (solo administradores)',
  })
  @ApiBody({
    type: CreateBarberDto,
    description: 'Datos del barbero a crear',
  })
  @ApiResponse({
    status: 201,
    description: 'Barbero creado exitosamente',
    type: Barber,
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
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  create(@Body() createBarberDto: CreateBarberDto) {
    return this.barbersService.create(createBarberDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Obtener todos los barberos',
    description: 'Obtiene la lista de todos los barberos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de barberos obtenida exitosamente',
    type: [Barber],
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  findAll() {
    return this.barbersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Obtener un barbero por ID',
    description: 'Obtiene los detalles de un barbero específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del barbero',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Barbero encontrado exitosamente',
    type: Barber,
  })
  @ApiResponse({
    status: 404,
    description: 'Barbero no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  findOne(@Param('id') id: string) {
    return this.barbersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Actualizar un barbero',
    description: 'Actualiza los datos de un barbero existente (solo administradores)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del barbero',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdateBarberDto,
    description: 'Datos a actualizar del barbero',
  })
  @ApiResponse({
    status: 200,
    description: 'Barbero actualizado exitosamente',
    type: Barber,
  })
  @ApiResponse({
    status: 404,
    description: 'Barbero no encontrado',
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
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  update(@Param('id') id: string, @Body() updateBarberDto: UpdateBarberDto) {
    return this.barbersService.update(id, updateBarberDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Eliminar un barbero',
    description: 'Elimina un barbero del sistema (solo administradores)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del barbero',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Barbero eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Barbero no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  remove(@Param('id') id: string) {
    return this.barbersService.remove(id);
  }
}
