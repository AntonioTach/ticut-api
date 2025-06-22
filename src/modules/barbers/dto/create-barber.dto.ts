import { IsEmail, IsString, MinLength, IsOptional, IsUUID } from 'class-validator';

export class CreateBarberDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsUUID()
  @IsOptional()
  barbershopId?: string;
}
