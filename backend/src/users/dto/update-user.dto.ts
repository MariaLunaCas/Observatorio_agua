//estos son los unicos 2 metodos que se van a utilizar para insertar datos dentro de la base de datos
// data transfer object son clases tp que definen la estructura de los datos que se van a transferir entre el cliente y el servidor, en este caso para crear y actualizar usuarios

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
