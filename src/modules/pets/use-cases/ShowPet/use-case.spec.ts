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
import ShowPetUseCase from './show-pet.use-case';
import {
  HealthPlan,
  HealthPlanSchema,
} from 'src/core/infra/database/mongo/schemas/healthplan.schema';
import HealthPlanRepository from 'src/modules/healthplan/repositories/healthplan.repository';
import HealthPlanAggregate from 'src/modules/healthplan/domain/entities/healthplan';

describe('ShowPetUseCase tests', () => {
  let useCase: ShowPetUseCase;
  let petRepository: IPetRepository;
  let userRepository: IUserRepository;
  let healthPlanRepository: HealthPlanRepository;
  let user: UserAggregate;
  let healthPlan: HealthPlanAggregate;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CoreModule,
        MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
        MongooseModule.forFeature([
          { name: Pet.name, schema: PetSchema },
          { name: User.name, schema: UserSchema },
          { name: HealthPlan.name, schema: HealthPlanSchema },
        ]),
      ],
      providers: [
        ShowPetUseCase,
        {
          provide: 'PetRepository',
          useClass: PetRepository,
        },
        {
          provide: 'HealthPlanRepository',
          useClass: HealthPlanRepository,
        },
        {
          provide: 'UserRepository',
          useClass: UserRepository,
        },
      ],
    }).compile();

    useCase = moduleRef.get(ShowPetUseCase);
    petRepository = moduleRef.get<IPetRepository>('PetRepository');
    userRepository = moduleRef.get<IUserRepository>('UserRepository');
    healthPlanRepository = moduleRef.get<HealthPlanRepository>(
      'HealthPlanRepository',
    );

    user = await UserAggregate.createCustomer({
      name: 'Test User',
      email: 'test_user_show_pet@email.com',
      password: 'Test@Password',
    });
    await userRepository.create(user);

    healthPlan = HealthPlanAggregate.create({
      name: 'Test Health Plan',
      description: 'Test Description',
      company: 'Test Company',
      price: 100,
      status: 'active',
    });

    await healthPlanRepository.create(healthPlan);
  });

  afterEach(async () => {
    await userRepository.delete(user.id);
    await healthPlanRepository.delete(healthPlan.id);
  });

  it('should show a pet', async () => {
    const pet = PetAggregate.createPet({
      name: 'Dog',
      breed: 'Golden Retriever',
      specie: 'Canis lupus familiaris',
      birthdate: new Date('2020-01-01'),
      userId: user.id,
      healthPlanId: healthPlan.id,
    });
    await petRepository.create(pet);
    // Arrange
    const dto = {
      petId: pet.id,
      userId: user.id,
    };
    // Act
    const result = await useCase.execute(dto);
    // Assert
    expect(result).toEqual({
      id: pet.id,
      name: pet.props.name,
      breed: pet.props.breed,
      specie: pet.props.specie,
      birthdate: pet.props.birthdate.toISOString().slice(0, 10),
      userId: pet.props.userId,
      healthPlanId: pet.props.healthPlanId,
    });
  });

  it('should throw an error when the pet does not exist', async () => {
    // Arrange
    const fake_pet_id = '6639b52364036fcbad08ee9c';
    const dto = {
      petId: fake_pet_id,
      userId: user.id,
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
      healthPlanId: healthPlan.id,
    });
    await petRepository.create(pet);
    const dto = {
      petId: pet.id,
      userId: '6639b52364036fcbad08ee9c',
    };
    // Act
    // Assert
    await expect(useCase.execute(dto)).rejects.toThrowError(
      UnauthorizedException,
    );
  });
});
