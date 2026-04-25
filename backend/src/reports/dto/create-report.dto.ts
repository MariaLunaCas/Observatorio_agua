import { Type } from "class-transformer";
import { MaxLength, IsObject, IsString, IsNumber, ValidateNested} from "class-validator";

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
    @ValidateNested()
    @Type(() => LocationDto)
    @IsObject()
    location!: LocationDto;
    @IsString()
    @MaxLength(200) 
    imageUrl!: string;
    @IsString()
    @MaxLength(100)
    contaminationType!: string;
}


