import { Provider } from '@nestjs/common';
import HealthPlanRepository from './repositories/healthplan.repository';

export const repositories: Provider[] = [
  {
    provide: 'HealthPlanRepository',
    useClass: HealthPlanRepository,
  },
];
