import { Inject } from '@nestjs/common';
import IHealthPlanRepository from '../../repositories/healplan.repository.interface';
import HealthPlanAggregate from '../../domain/entities/healthplan';

export default class CreateHealthPlanUseCase {
  constructor(
    @Inject('HealthPlanRepository')
    private readonly healthPlanRepository: IHealthPlanRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const healthPlan = HealthPlanAggregate.create(input);
    await this.healthPlanRepository.create(healthPlan);
    return {
      id: healthPlan.id,
      ...healthPlan.props,
    };
  }
}

type Input = {
  name: string;
  description: string;
  company: string;
  price: number;
  status: 'active' | 'inactive';
};

type Output = {
  id: string;
  name: string;
  description: string;
  company: string;
  price: number;
  status: 'active' | 'inactive';
};
