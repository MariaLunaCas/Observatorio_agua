//estos son los unicos 2 metodos que se van a utilizar para insertar datos dentro de la base de datos
import { IsString, MaxLength, IsEmail  } from "class-validator"

export class CreateUserDto {

  @IsString()
  @MaxLength(25)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  role!: string;
}