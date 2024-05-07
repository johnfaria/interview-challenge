import { Inject } from '@nestjs/common';
import { IExceptionService } from 'src/core/domain/exceptions/exceptions.interface';
import IHealthPlanRepository from '../../repositories/healplan.repository.interface';

export default class DeleteHealthPlanUseCase {
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
        message: 'Health plan not found',
      });
    }

    await this.healthPlanRepository.delete(input.healthPlanId);
  }
}

type Input = {
  healthPlanId: string;
  userId: string;
};

type Output = void;
