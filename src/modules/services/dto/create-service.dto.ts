import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, Min, MinLength, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'ID de la barbería',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  barbershopId: string;

  @ApiProperty({
    description: 'Nombre del servicio',
    example: 'Corte de cabello',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción del servicio',
    example: 'Corte de cabello clásico con lavado incluido',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Precio del servicio',
    example: 25.00,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Duración del servicio en minutos',
    example: 30,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  durationMinutes: number;

  @ApiPropertyOptional({
    description: 'Indica si el servicio está activo',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiPropertyOptional({
    description: 'URL de la imagen del servicio',
    example: 'https://example.com/service-image.jpg',
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
} 