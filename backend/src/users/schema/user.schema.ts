import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name!: string;

  @Prop({ unique: true, sparse: true })
  username!: string;

  @Prop({ unique: true })
  email!: string;

  @Prop()
  password!: string;

  @Prop()
  role!: string;

  @Prop()
  requestedRole!: string;

  @Prop({ default: 'active' })
  status!: string;

  @Prop()
  approvedBy!: string;

  @Prop()
  approvedAt!: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
