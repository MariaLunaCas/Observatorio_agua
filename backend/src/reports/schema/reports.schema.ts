import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportSchema = HydratedDocument<Report>; // documento de mongoose que representa un reporte

@Schema()
export class Report {
  @Prop()
  title!: string;

  @Prop()
  description!: string;

  @Prop()
  waterSource!: string;

  @Prop()
  address!: string;

  @Prop({
    type: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    required: true,
  })
  location!: {
    latitude: number;
    longitude: number;
  };

  @Prop()
  imageUrl!: string;

  @Prop({ type: [String], default: [] })
  imageUrls!: string[];

  @Prop()
  contaminationType!: string;

  @Prop({ default: 1 })
  urgency!: number;

  @Prop({ default: 'pending' })
  status!: string;

  @Prop()
  createdBy!: string;

  @Prop()
  validatorNote!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const ReportSchema = SchemaFactory.createForClass(Report); // crea un esquema de mongoose a partir de la clase Report
