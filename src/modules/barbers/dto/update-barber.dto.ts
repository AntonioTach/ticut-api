import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateBarberDto } from './create-barber.dto';

export class UpdateBarberDto extends PartialType(CreateBarberDto) {
  @ApiPropertyOptional({
    description: 'Email del barbero',
    example: 'barbero@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Contraseña del barbero (mínimo 6 caracteres)',
    example: 'password123',
    minLength: 6,
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'Nombre completo del barbero',
    example: 'Carlos Rodríguez',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del barbero',
    example: '1234567890',
  })
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'URL del avatar del barbero',
    example: 'https://example.com/barber-avatar.jpg',
  })
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'ID de la barbería donde trabaja',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  barbershopId?: string;
}
