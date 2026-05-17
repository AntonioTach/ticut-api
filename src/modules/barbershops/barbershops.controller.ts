import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { BarbershopsService } from './barbershops.service';
import { CreateBarbershopDto } from './dto/create-barbershop.dto';
import { UpdateBarbershopDto } from './dto/update-barbershop.dto';
import { Barbershop } from './entities/barbershop.entity';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../core/enums/role.enum';

@ApiTags('barbershops')
@ApiBearerAuth('JWT-auth')
@Controller('barbershops')
export class BarbershopsController {
  constructor(private readonly barbershopsService: BarbershopsService) {}

  @Roles(Role.OWNER)
  @Post()
  @ApiOperation({ summary: 'Crear sucursal', description: 'El OWNER crea una nueva sucursal dentro de su cadena.' })
  @ApiBody({ type: CreateBarbershopDto })
  @ApiResponse({ status: 201, description: 'Sucursal creada', type: Barbershop })
  create(@Body() dto: CreateBarbershopDto) {
    return this.barbershopsService.create(dto);
  }

  @Roles(Role.OWNER)
  @Get('brand/:brandId')
  @ApiOperation({ summary: 'Sucursales de una cadena', description: 'Retorna todas las sucursales de la cadena del OWNER.' })
  @ApiResponse({ status: 200, description: 'Lista de sucursales', type: [Barbershop] })
  findByBrand(@Param('brandId') brandId: string) {
    return this.barbershopsService.findByBrand(brandId);
  }

  @Roles(Role.OWNER)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener sucursal por ID' })
  @ApiResponse({ status: 200, description: 'Sucursal encontrada', type: Barbershop })
  @ApiResponse({ status: 404, description: 'Sucursal no encontrada' })
  findOne(@Param('id') id: string) {
    return this.barbershopsService.findOne(id);
  }

  @Roles(Role.OWNER)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar sucursal' })
  @ApiBody({ type: UpdateBarbershopDto })
  @ApiResponse({ status: 200, description: 'Sucursal actualizada', type: Barbershop })
  update(@Param('id') id: string, @Body() dto: UpdateBarbershopDto) {
    return this.barbershopsService.update(id, dto);
  }

  @Roles(Role.OWNER)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar sucursal' })
  @ApiResponse({ status: 200, description: 'Sucursal eliminada' })
  remove(@Param('id') id: string) {
    return this.barbershopsService.remove(id);
  }
}
