import { IRepository } from 'src/core/domain/repositories/repository.interface';
import { UserAggregate } from '../domain/entities/User';

export interface IUserRepository extends IRepository<UserAggregate> {
  findByEmail(email: string): Promise<UserAggregate>;
}
