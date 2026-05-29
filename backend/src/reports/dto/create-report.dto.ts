import { Type } from 'class-transformer';
import {
  MaxLength,
  IsObject,
  IsString,
  IsNumber,
  ValidateNested,
  IsOptional,
  IsArray,
} from 'class-validator';

class LocationDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}

export class CreateReportDto {
  @IsString()
  @MaxLength(100)
  title!: string;
  @IsString()
  @MaxLength(200)
  description!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  waterSource?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsObject()
  location!: LocationDto;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @IsString()
  @MaxLength(100)
  contaminationType!: string;

  @IsOptional()
  @IsNumber()
  urgency?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  validatorNote?: string;
}
