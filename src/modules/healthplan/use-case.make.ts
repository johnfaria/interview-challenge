import { Provider } from '@nestjs/common';
import CreateHealthPlanUseCase from './use-cases/CreateHealthPlan/create-health-plan.use-case';
import DeleteHealthPlanUseCase from './use-cases/DeleteHealthPlan/delete-health-plan.use-case';
import ShowHealthPlanUseCase from './use-cases/ShowHealthPlan/show-health-plan.use-case';
import UpdateHealthPlanUseCase from './use-cases/UpdateHealthPlan/update-health-plan.use-case';

export const useCases: Provider[] = [
  {
    provide: 'CreateHealthPlanUseCase',
    useClass: CreateHealthPlanUseCase,
  },
  {
    provide: 'UpdateHealthPlanUseCase',
    useClass: UpdateHealthPlanUseCase,
  },
  {
    provide: 'ShowHealthPlanUseCase',
    useClass: ShowHealthPlanUseCase,
  },
  {
    provide: 'DeleteHealthPlanUseCase',
    useClass: DeleteHealthPlanUseCase,
  },
];
