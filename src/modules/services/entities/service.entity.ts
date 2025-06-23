import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Service {
  @ApiProperty({
    description: 'ID único del servicio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID de la barbería',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  barbershopId: string;

  @ApiProperty({
    description: 'Nombre del servicio',
    example: 'Corte de cabello',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción del servicio',
    example: 'Corte de cabello clásico con lavado incluido',
  })
  description?: string;

  @ApiProperty({
    description: 'Precio del servicio',
    example: 25.00,
  })
  price: number;

  @ApiProperty({
    description: 'Duración del servicio en minutos',
    example: 30,
  })
  durationMinutes: number;

  @ApiProperty({
    description: 'Indica si el servicio está activo',
    example: true,
  })
  active: boolean;

  @ApiPropertyOptional({
    description: 'URL de la imagen del servicio',
    example: 'https://example.com/service-image.jpg',
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'Fecha de creación del servicio',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del servicio',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
} 