import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HealthPlanDocument = HydratedDocument<HealthPlan>;

@Schema()
export class HealthPlan {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;
}

export const HealthPlanSchema = SchemaFactory.createForClass(HealthPlan);
