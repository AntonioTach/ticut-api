import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { BarbersModule } from './modules/barbers/barbers.module';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './modules/services/services.module';
import { ClientsModule } from './modules/clients/clients.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    PrismaModule,
    AuthModule,
    BarbersModule,
    UsersModule,
    ServicesModule,
    ClientsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
