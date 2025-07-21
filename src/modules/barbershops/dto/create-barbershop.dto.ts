import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBarbershopDto {
  @ApiProperty({ description: 'Nombre de la barbería', example: 'Barbería Central' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Dirección de la barbería', example: 'Calle Falsa 123' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'ID del propietario', example: 'uuid-owner-id' })
  @IsString()
  ownerId: string;
} 