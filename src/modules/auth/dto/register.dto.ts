import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 8 caracteres)',
    example: 'password12345',
    minLength: 8,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del usuario',
    example: '1234567890',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
} 