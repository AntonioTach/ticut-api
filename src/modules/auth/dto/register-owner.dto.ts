import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterOwnerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'email@ticut.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ example: '5512345678' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: 'Ticut Barbers' })
  @IsString()
  brandName: string;

  @ApiProperty({ example: 'Ticut Centro' })
  @IsString()
  barbershopName: string;

  @ApiProperty({ example: 'Calle 5 #123, CDMX' })
  @IsString()
  address: string;
}
