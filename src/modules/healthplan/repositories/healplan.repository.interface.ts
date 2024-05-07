import { IRepository } from 'src/core/domain/repositories/repository.interface';
import HealthPlanAggregate from '../domain/entities/healthplan';

export default interface IHealthPlanRepository
  extends IRepository<HealthPlanAggregate> {}
