import { IsEmail, IsString, MinLength, IsOptional, IsUUID, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBarberDto {
  @ApiProperty({
    description: 'Email del barbero',
    example: 'barbero@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del barbero (mínimo 6 caracteres)',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Nombre completo del barbero',
    example: 'Carlos Rodríguez',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del barbero',
    example: '1234567890',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'URL del avatar del barbero',
    example: 'https://example.com/barber-avatar.jpg',
  })
  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'ID de la barbería donde trabajará',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  barbershopId?: string;
}
