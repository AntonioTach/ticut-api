import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiPropertyOptional({
    description: 'ID de la barbería',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  barbershopId?: string;

  @ApiPropertyOptional({
    description: 'Nombre del cliente',
    example: 'Juan',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Apellido del cliente',
    example: 'Pérez',
  })
  lastname?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del cliente',
    example: '1234567890',
  })
  phone?: string;

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