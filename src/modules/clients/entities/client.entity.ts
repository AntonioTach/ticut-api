import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Client {
  @ApiProperty({
    description: 'ID único del cliente',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID de la barbería',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  barbershopId: string;

  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan',
  })
  name: string;

  @ApiProperty({
    description: 'Apellido del cliente',
    example: 'Pérez',
  })
  lastname: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '1234567890',
  })
  phone: string;

  @ApiPropertyOptional({
    description: 'Email del cliente',
    example: 'juan@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales sobre el cliente',
    example: 'Cliente preferido, le gusta el corte clásico',
  })
  notes?: string;
} 