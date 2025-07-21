import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { DashboardService } from './dashboard.service';
import { Role } from '../core/enums/role.enum';

@ApiTags('dashboard')
@ApiBearerAuth('JWT-auth')
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Vista general del dashboard',
    description: 'Obtiene estadísticas generales para el dashboard',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos del dashboard obtenidos exitosamente',
    schema: {
      type: 'object',
      properties: {
        totalClients: { type: 'number', example: 150 },
        totalServices: { type: 'number', example: 25 },
        totalBarbers: { type: 'number', example: 8 },
        recentAppointments: { type: 'array' },
        topServices: { type: 'array' },
        monthlyRevenue: { type: 'number', example: 15000 },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async getOverview(@Request() req) {
    const barbershopId = req.user.barbershopId;
    return this.dashboardService.getOverview(barbershopId);
  }

  @Get('statistics')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Estadísticas detalladas',
    description: 'Obtiene estadísticas detalladas para gráficos y métricas',
  })
  @ApiQuery({
    name: 'period',
    description: 'Período de tiempo para las estadísticas',
    required: false,
    example: 'month',
    enum: ['day', 'week', 'month', 'year'],
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas obtenidas exitosamente',
  })
  async getStatistics(
    @Request() req,
    @Query('period') period: string = 'month',
  ) {
    const barbershopId = req.user.barbershopId;
    return this.dashboardService.getStatistics(barbershopId, period);
  }

  @Get('recent-activity')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Actividad reciente',
    description: 'Obtiene la actividad reciente de la barbería',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Número máximo de actividades a obtener',
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Actividad reciente obtenida exitosamente',
  })
  async getRecentActivity(
    @Request() req,
    @Query('limit') limit: number = 10,
  ) {
    const barbershopId = req.user.barbershopId;
    return this.dashboardService.getRecentActivity(barbershopId, limit);
  }

  @Get('quick-actions')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({
    summary: 'Acciones rápidas',
    description: 'Obtiene datos para acciones rápidas del dashboard',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos de acciones rápidas obtenidos exitosamente',
  })
  async getQuickActions(@Request() req) {
    const barbershopId = req.user.barbershopId;
    return this.dashboardService.getQuickActions(barbershopId);
  }
} 