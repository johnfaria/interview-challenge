import { Inject } from '@nestjs/common';
import { IPetRepository } from '../../repository/pet.repository.interface';
import { PetAggregate } from '../../domain/entities/pet';
import { IExceptionService } from 'src/core/domain/exceptions/exceptions.interface';

export default class UpdatePetUseCase {
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

    if (data.name) pet.setName(data.name);
    if (data.breed) pet.setBreed(data.breed);
    if (data.specie) pet.setSpecie(data.specie);
    if (data.birthdate) pet.setBirthdate(new Date(data.birthdate));
    if (data.newOwnerId) pet.setOwnerId(data.newOwnerId);

    await this.repository.update(pet);
  }
}

type Input = {
  petId: string;
  userId: string;
  name: string;
  breed: string;
  specie: string;
  birthdate: string;
  newOwnerId: string;
};

type Output = void;
