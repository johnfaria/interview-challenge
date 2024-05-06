import { IRepository } from 'src/core/domain/repositories/repository.interface';
import { UserAggregate } from '../domain/entities/user';

export interface IUserRepository extends IRepository<UserAggregate> {
  findByEmail(email: string): Promise<UserAggregate>;
}
