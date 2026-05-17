import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HashService } from './services/hash.service';
import { EmailService } from './services/email.service';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRESIN') ?? '24h' },
      }),
    }),
  ],
  providers: [JwtStrategy, HashService, EmailService],
  exports: [JwtModule, HashService, EmailService],
})
export class SharedModule {} 