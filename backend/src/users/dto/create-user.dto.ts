//estos son los unicos 2 metodos que se van a utilizar para insertar datos dentro de la base de datos
import { IsString, MaxLength, IsEmail  } from "class-validator"

export class CreateUserDto {
<<<<<<< Updated upstream
  @IsString()
  @MaxLength(25)
  name: string;

=======

  @IsString()
  @MaxLength(25)
  name: string;

>>>>>>> Stashed changes
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
