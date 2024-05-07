import { Test } from '@nestjs/testing';
import CreatePetUseCase from './create-pet.use-case';
import { PetRepository } from '../../repository/pet.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Pet,
  PetSchema,
} from 'src/core/infra/database/mongo/schemas/pet.schema';
import {
  User,
  UserSchema,
} from 'src/core/infra/database/mongo/schemas/user.schema';

describe('CreatePet', () => {
  let useCase: CreatePetUseCase;
  // let petRepository: IPetRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
        MongooseModule.forFeature([
          { name: Pet.name, schema: PetSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [
        CreatePetUseCase,
        {
          provide: 'PetRepository',
          useClass: PetRepository,
        },
      ],
    }).compile();

    useCase = moduleRef.get(CreatePetUseCase);
    // petRepository = moduleRef.get('PetRepository');
  });

  it('should create a new pet', async () => {
    // Arrange
    const pet = {
      name: 'Dog',
      breed: 'Golden Retriever',
      specie: 'Canis lupus familiaris',
      birthdate: '2020-01-01',
      userId: '66396631435998b8e2033a2f',
    };
    // Act
    const result = await useCase.execute(pet);
    // Assert
    expect(result).toEqual({
      id: expect.any(String),
      ...pet,
    });
  });
});
