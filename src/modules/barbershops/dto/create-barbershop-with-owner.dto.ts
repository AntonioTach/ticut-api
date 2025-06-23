import { ApiProperty } from '@nestjs/swagger';
import { CreateBarbershopWithoutOwnerIdDto } from './create-barbershop-without-ownerid.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBarbershopWithOwnerDto {
  @ApiProperty({
    description: 'Datos de la barbería (sin ownerId)',
    type: CreateBarbershopWithoutOwnerIdDto,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateBarbershopWithoutOwnerIdDto)
  barbershop: CreateBarbershopWithoutOwnerIdDto;

  @ApiProperty({
    description: 'Datos del usuario propietario',
    type: CreateUserDto,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateUserDto)
  owner: CreateUserDto;
} 