import { Types } from 'mongoose';
import { AggregateRoot } from 'src/core/domain/aggregate';

interface HealthProps {
  name: string;
  description: string;
  company: string;
  price: number;
  status: 'active' | 'inactive';
}

export default class HealthPlanAggregate extends AggregateRoot<HealthProps> {
  static create(props: HealthProps): HealthPlanAggregate {
    const id = new Types.ObjectId().toHexString();
    const healthPlan = new HealthPlanAggregate(id, props);

    return healthPlan;
  }

  static restore(id: string, props: HealthProps): HealthPlanAggregate {
    const healthPlan = new HealthPlanAggregate(id, props);
    return healthPlan;
  }
}
