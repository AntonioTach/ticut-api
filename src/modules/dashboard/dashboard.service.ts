import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(barbershopId: string) {
    // Obtener estadísticas generales
    const [
      totalClients,
      totalServices,
      totalBarbers,
      monthlyRevenue,
    ] = await Promise.all([
      this.prisma.client.count({
        where: { barbershopId },
      }),
      this.prisma.service.count({
        where: { barbershopId, active: true },
      }),
      this.prisma.user.count({
        where: { 
          barbershopId,
          role: 'BARBER',
        },
      }),
      this.getMonthlyRevenue(barbershopId),
    ]);

    // Obtener servicios más populares
    const topServices = await this.getTopServices(barbershopId);

    // Obtener citas recientes (si tienes un módulo de appointments)
    const recentAppointments = await this.getRecentAppointments(barbershopId);

    return {
      totalClients,
      totalServices,
      totalBarbers,
      monthlyRevenue,
      topServices,
      recentAppointments,
    };
  }

  async getStatistics(barbershopId: string, period: string = 'month') {
    const startDate = this.getStartDate(period);

    const [
      clientGrowth,
      revenueData,
      serviceUsage,
    ] = await Promise.all([
      this.getClientGrowth(barbershopId, startDate),
      this.getRevenueData(barbershopId, startDate),
      this.getServiceUsage(barbershopId, startDate),
    ]);

    return {
      clientGrowth,
      revenueData,
      serviceUsage,
      period,
    };
  }

  async getRecentActivity(barbershopId: string, limit: number = 10) {
    // Aquí puedes implementar la lógica para obtener actividad reciente
    // Por ejemplo: nuevas citas, nuevos clientes, servicios realizados, etc.
    
    const recentClients = await this.prisma.client.findMany({
      where: { barbershopId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        lastname: true,
        createdAt: true,
      },
    });

    return {
      recentClients,
      // Puedes agregar más tipos de actividad aquí
    };
  }

  async getQuickActions(barbershopId: string) {
    // Datos para acciones rápidas como crear cita, agregar cliente, etc.
    const activeServices = await this.prisma.service.findMany({
      where: { barbershopId, active: true },
      select: {
        id: true,
        name: true,
        price: true,
      },
    });

    const availableBarbers = await this.prisma.user.findMany({
      where: { 
        barbershopId,
        role: 'BARBER',
      },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      activeServices,
      availableBarbers,
    };
  }

  private async getMonthlyRevenue(barbershopId: string): Promise<number> {
    // Implementar lógica para calcular ingresos mensuales
    // Esto dependerá de si tienes un módulo de appointments/payments
    return 0; // Placeholder
  }

  private async getTopServices(barbershopId: string) {
    // Implementar lógica para obtener servicios más populares
    return []; // Placeholder
  }

  private async getRecentAppointments(barbershopId: string) {
    // Implementar lógica para obtener citas recientes
    return []; // Placeholder
  }

  private async getClientGrowth(barbershopId: string, startDate: Date) {
    const newClients = await this.prisma.client.count({
      where: {
        barbershopId,
        createdAt: { gte: startDate },
      },
    });

    return { newClients };
  }

  private async getRevenueData(barbershopId: string, startDate: Date) {
    // Implementar lógica para obtener datos de ingresos
    return { total: 0, data: [] }; // Placeholder
  }

  private async getServiceUsage(barbershopId: string, startDate: Date) {
    // Implementar lógica para obtener uso de servicios
    return []; // Placeholder
  }

  private getStartDate(period: string): Date {
    const now = new Date();
    switch (period) {
      case 'day':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        return weekStart;
      case 'month':
        return new Date(now.getFullYear(), now.getMonth(), 1);
      case 'year':
        return new Date(now.getFullYear(), 0, 1);
      default:
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }
  }
} 