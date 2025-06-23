import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Barber {
  @ApiProperty({
    description: 'ID único del barbero',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Email del barbero',
    example: 'barbero@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre completo del barbero',
    example: 'Carlos Rodríguez',
  })
  name: string;

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

  @ApiProperty({
    description: 'ID de la barbería donde trabaja',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  barbershopId: string;

  @ApiProperty({
    description: 'Rol del barbero',
    example: 'BARBER',
  })
  role: string;

  @ApiProperty({
    description: 'Fecha de creación del barbero',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del barbero',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
