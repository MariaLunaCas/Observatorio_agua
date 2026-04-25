import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedArraySubdocument } from 'mongoose';
// el es un tipo proporcionado por mongoose 

export type UserSchema = HydratedArraySubdocument<User>;
//los decoradores @Prop y @Schema son proporcionados por el paquete @nestjs/mongoose y se utilizan para definir la estructura de un esquema de mongoose a partir de una clase de TypeScript. El decorador @Schema se utiliza para marcar una clase como un esquema de mongoose, mientras que el decorador @Prop se utiliza para definir las propiedades del esquema.
@Schema()
export class User {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    role: string

}
// con esto convertimos la clase user en un esquema de mongoose

export const UserSchema = SchemaFactory.createForClass(User);
