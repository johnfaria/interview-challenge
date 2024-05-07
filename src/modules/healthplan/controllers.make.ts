import CreateHealthPlanController from './use-cases/CreateHealthPlan/create-health-plan.controller';
import DeleteHealthPlanController from './use-cases/DeleteHealthPlan/delete-health-plan.controller';
import ShowHealthPlanController from './use-cases/ShowHealthPlan/show-health-plan.controller';
import UpdateHealthPlanController from './use-cases/UpdateHealthPlan/update-health-plan.controller';

export const controllers: any[] = [
  CreateHealthPlanController,
  UpdateHealthPlanController,
  ShowHealthPlanController,
  DeleteHealthPlanController,
];
