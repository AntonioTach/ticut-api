import { ApiProperty } from '@nestjs/swagger';

export class Barbershop {
  @ApiProperty({ description: 'ID de la barbería', example: 'uuid-barbershop-id' })
  id: string;

  @ApiProperty({ description: 'Nombre de la barbería', example: 'Barbería Central' })
  name: string;

  @ApiProperty({ description: 'Dirección de la barbería', example: 'Calle Falsa 123' })
  address: string;

  @ApiProperty({ description: 'ID del propietario', example: 'uuid-owner-id' })
  ownerId: string;

  @ApiProperty({ description: 'Fecha de creación', example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización', example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
} 