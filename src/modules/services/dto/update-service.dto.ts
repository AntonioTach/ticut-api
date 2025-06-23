import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiPropertyOptional({
    description: 'ID de la barbería',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  barbershopId?: string;

  @ApiPropertyOptional({
    description: 'Nombre del servicio',
    example: 'Corte de cabello',
    minLength: 1,
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción del servicio',
    example: 'Corte de cabello clásico con lavado incluido',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Precio del servicio',
    example: 25.00,
    minimum: 0,
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'Duración del servicio en minutos',
    example: 30,
    minimum: 1,
  })
  durationMinutes?: number;

  @ApiPropertyOptional({
    description: 'Indica si el servicio está activo',
    example: true,
  })
  active?: boolean;

  @ApiPropertyOptional({
    description: 'URL de la imagen del servicio',
    example: 'https://example.com/service-image.jpg',
  })
  imageUrl?: string;
} 