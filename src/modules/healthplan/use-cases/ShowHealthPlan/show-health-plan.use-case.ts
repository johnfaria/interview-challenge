import { Inject } from '@nestjs/common';
import { IExceptionService } from 'src/core/domain/exceptions/exceptions.interface';
import IHealthPlanRepository from '../../repositories/healplan.repository.interface';

export default class ShowHealthPlanUseCase {
  constructor(
    @Inject('ExceptionsService')
    private readonly exceptionService: IExceptionService,
    @Inject('HealthPlanRepository')
    private readonly healthPlanRepository: IHealthPlanRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const healthPlan = await this.healthPlanRepository.findById(
      input.healthPlanId,
    );
    if (!healthPlan) {
      this.exceptionService.notFoundException({
        message: 'HealthPlan not found',
      });
    }
    return {
      id: healthPlan.id,
      ...healthPlan.props,
    };
  }
}

type Input = {
  userId: string;
  healthPlanId: string;
};

type Output = {
  id: string;
  name: string;
  description: string;
  company: string;
  price: number;
  status: 'active' | 'inactive';
};
