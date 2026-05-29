import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  reportId!: string;

  @Prop({ required: true })
  authorEmail!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ default: 'visible' })
  status!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
