import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type PetDocument = HydratedDocument<Pet>;

@Schema()
export class Pet {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  specie: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
