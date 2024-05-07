import { Inject } from '@nestjs/common';
import { IExceptionService } from 'src/core/domain/exceptions/exceptions.interface';
import IHealthPlanRepository from '../../repositories/healplan.repository.interface';

export default class UpdateHealthPlanUseCase {
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

    if (healthPlan.props.name) healthPlan.setNewName(input.name);
    if (healthPlan.props.description)
      healthPlan.setNewDescription(input.description);
    if (healthPlan.props.company) healthPlan.setNewCompany(input.company);
    if (healthPlan.props.price) healthPlan.setNewPrice(input.price);
    if (healthPlan.props.status) healthPlan.setNewStatus(input.status);

    await this.healthPlanRepository.update(healthPlan);
  }
}

type Input = {
  userId: string;
  healthPlanId: string;
  name: string;
  description: string;
  company: string;
  price: number;
  status: 'active' | 'inactive';
};

type Output = void;
