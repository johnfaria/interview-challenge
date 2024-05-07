import { Inject } from '@nestjs/common';
import { IPetRepository } from '../../repository/pet.repository.interface';
import { PetAggregate } from '../../domain/entities/pet';
import { IExceptionService } from 'src/core/domain/exceptions/exceptions.interface';

export default class ShowPetsByUserIdUseCase {
  constructor(
    @Inject('PetRepository') private repository: IPetRepository,
    @Inject('ExceptionsService')
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(data: Input): Promise<Output[]> {
    const pets: PetAggregate[] = await this.repository.findAllPetsByUserId(
      data.userId,
    );

    return pets.map((pet) => ({
      id: pet.id,
      name: pet.props.name,
      breed: pet.props.breed,
      specie: pet.props.specie,
      birthdate: pet.props.birthdate.toISOString().slice(0, 10),
      userId: pet.props.userId,
    }));
  }
}
type Input = {
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
