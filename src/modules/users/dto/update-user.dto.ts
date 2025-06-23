import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Email del usuario',
    example: 'usuario@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: 'password123',
    minLength: 6,
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del usuario',
    example: '1234567890',
  })
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'URL del avatar del usuario',
    example: 'https://example.com/avatar.jpg',
  })
  avatarUrl?: string;
}
