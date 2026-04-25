import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ReportSchema = HydratedDocument<Report> // documento de mongoose que representa un reporte

@Schema()
export class Report {
    @Prop()
    title!: string;

    @Prop()
    description!: string;   
    
    @Prop({
        type: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },
        required: true
    })
    location!: {
        latitude: number;
        longitude: number;
    };

    @Prop()
    imageUrl!: string;

    @Prop()
    contaminationType!: string;

}          

export const ReportSchema = SchemaFactory.createForClass(Report) // crea un esquema de mongoose a partir de la clase Report
