import { IRepository } from 'src/core/domain/repositories/repository.interface';
import { PetAggregate } from '../domain/entities/pet';

export interface IPetRepository extends IRepository<PetAggregate> {
  findAllPetsByUserId(userId: string): Promise<PetAggregate[]>;
}
