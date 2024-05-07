import { Inject } from '@nestjs/common';
import { PetAggregate } from '../../domain/entities/pet';
import { IPetRepository } from '../../repository/pet.repository.interface';

export default class CreatePetUseCase {
  constructor(@Inject('PetRepository') private repository: IPetRepository) {}

  async execute(data: Input): Promise<Output> {
    const pet = PetAggregate.createPet({
      name: data.name,
      breed: data.breed,
      specie: data.specie,
      birthdate: new Date(data.birthdate),
      userId: data.userId,
    });
    await this.repository.create(pet);
    return {
      id: pet.id,
      name: pet.props.name,
      breed: pet.props.breed,
      specie: pet.props.specie,
      birthdate: pet.props.birthdate.toISOString().slice(0, 10),
      userId: pet.props.userId,
    };
  }
}

type Input = {
  name: string;
  breed: string;
  specie: string;
  birthdate: string;
  userId: string;
};

type Output = {
  id: string;
  name: string;
  breed: string;
  specie: string;
  birthdate: string;
  userId: string;
};
