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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../core/enums/role.enum';
import { Public } from '../core/decorators/public.decorator';

@Controller('services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.BARBER)
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @Public()
  async findAll(@Query('barbershopId') barbershopId?: string) {
    return this.servicesService.findAll(barbershopId);
  }

  @Get('barbershop/:barbershopId')
  @Public()
  async findByBarbershop(@Param('barbershopId') barbershopId: string) {
    return this.servicesService.findByBarbershop(barbershopId);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.BARBER)
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Patch(':id/toggle-active')
  @Roles(Role.ADMIN, Role.BARBER)
  async toggleActive(@Param('id') id: string) {
    return this.servicesService.toggleActive(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.BARBER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  @Get('admin/test')
  @Public()
  async test() {
    return { message: 'Services module is working correctly' };
  }
} 