import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BarbershopsService } from './barbershops.service';
import { CreateBarbershopDto } from './dto/create-barbershop.dto';
import { UpdateBarbershopDto } from './dto/update-barbershop.dto';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { Public } from '../core/decorators/public.decorator';
import { CreateBarbershopWithOwnerDto } from './dto/create-barbershop-with-owner.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Barbershop } from './entities/barbershop.entity';

@ApiTags('barbershops')
@Controller('barbershops')
export class BarbershopsController {
  constructor(private readonly barbershopsService: BarbershopsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Crear barbería', description: 'Crea una nueva barbería.' })
  @ApiBody({ type: CreateBarbershopDto })
  @ApiResponse({ status: 201, description: 'Barbería creada exitosamente', type: Barbershop })
  create(@Body() createBarbershopDto: CreateBarbershopDto) {
    return this.barbershopsService.create(createBarbershopDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrar barbería y propietario', description: 'Crea una barbería y su usuario propietario en una sola operación.' })
  @ApiBody({ type: CreateBarbershopWithOwnerDto })
  @ApiResponse({ status: 201, description: 'Barbería y propietario creados exitosamente', schema: { example: { owner: { id: 'uuid', email: 'owner@example.com', name: 'Owner', roleId: 1 }, barbershop: { id: 'uuid', name: 'Barbería Central', address: 'Calle Falsa 123', ownerId: 'uuid' } } } })
  createWithOwner(@Body() dto: CreateBarbershopWithOwnerDto) {
    return this.barbershopsService.createWithOwner(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todas las barberías', description: 'Devuelve una lista de todas las barberías.' })
  @ApiResponse({ status: 200, description: 'Lista de barberías', type: [Barbershop] })
  findAll() {
    return this.barbershopsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener barbería por ID', description: 'Devuelve los datos de una barbería específica.' })
  @ApiResponse({ status: 200, description: 'Barbería encontrada', type: Barbershop })
  @ApiResponse({ status: 404, description: 'Barbería no encontrada' })
  findOne(@Param('id') id: string) {
    return this.barbershopsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar barbería', description: 'Actualiza los datos de una barbería.' })
  @ApiBody({ type: UpdateBarbershopDto })
  @ApiResponse({ status: 200, description: 'Barbería actualizada', type: Barbershop })
  update(@Param('id') id: string, @Body() updateBarbershopDto: UpdateBarbershopDto) {
    return this.barbershopsService.update(id, updateBarbershopDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar barbería', description: 'Elimina una barbería por su ID.' })
  @ApiResponse({ status: 200, description: 'Barbería eliminada' })
  remove(@Param('id') id: string) {
    return this.barbershopsService.remove(id);
  }
} 