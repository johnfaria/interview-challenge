import { Inject } from '@nestjs/common';
import { IPetRepository } from '../../repository/pet.repository.interface';
import { PetAggregate } from '../../domain/entities/pet';
import { IExceptionService } from 'src/core/domain/exceptions/exceptions.interface';

export default class DeletePetUseCase {
  constructor(
    @Inject('PetRepository') private repository: IPetRepository,
    @Inject('ExceptionsService')
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(data: Input): Promise<Output> {
    const pet: PetAggregate = await this.repository.findById(data.petId);

    if (!pet) {
      this.exceptionService.notFoundException({
        message: 'Pet not found',
      });
    }

    const isOwner = pet.verifyOwnership(data.userId);

    if (!isOwner) {
      this.exceptionService.unauthorizedException({
        message: 'You are not the owner of this pet',
      });
    }

    await this.repository.delete(data.petId);
  }
}

type Input = {
  userId: string;
  petId: string;
};

type Output = void;
