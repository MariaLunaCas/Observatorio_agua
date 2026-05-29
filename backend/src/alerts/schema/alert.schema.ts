import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AlertDocument = HydratedDocument<Alert>;

@Schema()
export class Alert {
  @Prop({ required: true })
  name!: string;

  @Prop()
  contaminationType!: string;

  @Prop()
  location!: string;

  @Prop({ default: 3 })
  minUrgency!: number;

  @Prop({ default: true })
  active!: boolean;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
