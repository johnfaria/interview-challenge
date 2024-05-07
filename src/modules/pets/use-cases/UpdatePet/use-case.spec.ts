import { Test } from '@nestjs/testing';
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
import { PetAggregate } from '../../domain/entities/pet';
import { UserAggregate } from 'src/modules/user/domain/entities/user';
import { UserRepository } from 'src/modules/user/repository/user-repository';
import { IPetRepository } from '../../repository/pet.repository.interface';
import { IUserRepository } from 'src/modules/user/repository/user-repository.interface';
import { CoreModule } from 'src/core/core.module';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import UpdatePetUseCase from './update-pet.use-case';

describe('UpdatePetUseCase tests', () => {
  let useCase: UpdatePetUseCase;
  let petRepository: IPetRepository;
  let userRepository: IUserRepository;
  let user: UserAggregate;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CoreModule,
        MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
        MongooseModule.forFeature([
          { name: Pet.name, schema: PetSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [
        UpdatePetUseCase,
        {
          provide: 'PetRepository',
          useClass: PetRepository,
        },
        {
          provide: 'UserRepository',
          useClass: UserRepository,
        },
      ],
    }).compile();

    useCase = moduleRef.get(UpdatePetUseCase);
    petRepository = moduleRef.get<IPetRepository>('PetRepository');
    userRepository = moduleRef.get<IUserRepository>('UserRepository');

    user = await UserAggregate.createCustomer({
      name: 'Test User Update Pet',
      email: 'test_user_update_pet@email.com',
      password: 'Test@Password',
    });
    await userRepository.create(user);
  });

  afterEach(async () => {
    await userRepository.delete(user.id);
  });

  it('should update a pet', async () => {
    const pet = PetAggregate.createPet({
      name: 'Dog',
      breed: 'Golden Retriever',
      specie: 'Canis lupus familiaris',
      birthdate: new Date('2020-01-01'),
      userId: user.id,
    });
    await petRepository.create(pet);
    // Arrange
    const dto = {
      petId: pet.id,
      userId: user.id,
      name: 'Dog Updated',
      breed: 'Golden Retriever Updated',
      specie: 'Canis lupus familiaris Updated',
      birthdate: '2021-01-01',
      newOwnerId: null,
    };
    // Act
    await useCase.execute(dto);
    // Assert
    const updatedPet = await petRepository.findById(pet.id);
    expect(updatedPet.id).toEqual(pet.id);
    expect(updatedPet.props.name).toEqual(dto.name);
    expect(updatedPet.props.breed).toEqual(dto.breed);
    expect(updatedPet.props.specie).toEqual(dto.specie);
    expect(updatedPet.props.birthdate.toISOString().slice(0, 10)).toEqual(
      dto.birthdate,
    );
  });

  it('should throw an error when the pet does not exist', async () => {
    // Arrange
    const fake_pet_id = '6639b52364036fcbad08ee9c';
    const dto = {
      petId: fake_pet_id,
      userId: user.id,
      name: 'Dog Updated',
      breed: 'Golden Retriever Updated',
      specie: 'Canis lupus familiaris Updated',
      birthdate: '2021-01-01',
      newOwnerId: null,
    };
    // Act
    // Assert
    await expect(useCase.execute(dto)).rejects.toThrowError(NotFoundException);
  });

  it('should throw an error when the user is not the owner of the pet', async () => {
    // Arrange
    const pet = PetAggregate.createPet({
      name: 'Dog',
      breed: 'Golden Retriever',
      specie: 'Canis lupus familiaris',
      birthdate: new Date('2020-01-01'),
      userId: user.id,
    });
    await petRepository.create(pet);
    const dto = {
      petId: pet.id,
      userId: '6639b52364036fcbad08ee9c',
      name: 'Dog Updated',
      breed: 'Golden Retriever Updated',
      specie: 'Canis lupus familiaris Updated',
      birthdate: '2021-01-01',
      newOwnerId: null,
    };
    // Act
    // Assert
    await expect(useCase.execute(dto)).rejects.toThrowError(
      UnauthorizedException,
    );
  });
});
