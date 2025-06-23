import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, Min, MinLength, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @IsUUID()
  barbershopId: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  durationMinutes: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
} 