import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { HealthPlan } from './healthplan.schema';

export type PetDocument = HydratedDocument<Pet>;

@Schema({
  timestamps: true,
})
export class Pet {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  specie: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    validate: {
      validator: async function (value: Types.ObjectId) {
        const user = await this.model(User.name).findById(value);
        return !!user;
      },
      message: 'User not found',
    },
  })
  user: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: HealthPlan.name,
    required: true,
    validate: {
      validator: async function (value: Types.ObjectId) {
        const healthplan = await this.model(HealthPlan.name).findById(value);
        return !!healthplan;
      },
      message: 'Healthplan not found',
    },
  })
  healthplan: Types.ObjectId;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
