import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterOwnerDto {
  @ApiProperty({ example: 'Antonio Tach' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'antonio@ticut.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
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
