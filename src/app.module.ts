import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BarbersModule } from './modules/barbers/barbers.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, BarbersModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
