import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HealthPlanDocument = HydratedDocument<HealthPlan>;

@Schema({
  timestamps: true,
})
export class HealthPlan {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  status: 'active' | 'inactive';
}

export const HealthPlanSchema = SchemaFactory.createForClass(HealthPlan);
