import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'ID de la barbería',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  barbershopId: string;

  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Apellido del cliente',
    example: 'Pérez',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '1234567890',
  })
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    description: 'Email del cliente',
    example: 'juan@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales sobre el cliente',
    example: 'Cliente preferido, le gusta el corte clásico',
  })
  @IsOptional()
  @IsString()
  notes?: string;
} 