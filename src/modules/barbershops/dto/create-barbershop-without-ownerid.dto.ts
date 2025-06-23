import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBarbershopWithoutOwnerIdDto {
  @ApiProperty({ description: 'Nombre de la barbería', example: 'Barbería Central' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Dirección de la barbería', example: 'Calle Falsa 123' })
  @IsString()
  address: string;
} 