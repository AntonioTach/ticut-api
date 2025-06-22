import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HashService } from './services/hash.service';
import { EmailService } from './services/email.service';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'temporary-secret-key-for-development', // Temporal
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [JwtStrategy, HashService, EmailService],
  exports: [JwtModule, HashService, EmailService],
})
export class SharedModule {} 