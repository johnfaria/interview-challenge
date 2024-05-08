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
import {
  HealthPlan,
  HealthPlanSchema,
} from 'src/core/infra/database/mongo/schemas/healthplan.schema';
import HealthPlanRepository from 'src/modules/healthplan/repositories/healthplan.repository';
import { UserRepository } from 'src/modules/user/repository/user-repository';
import { UserAggregate } from 'src/modules/user/domain/entities/user';
import HealthPlanAggregate from 'src/modules/healthplan/domain/entities/healthplan';

describe('CreatePet', () => {
  let useCase: CreatePetUseCase;
  let userRepository: UserRepository;
  let healthPlanRepository: HealthPlanRepository;
  let user: UserAggregate;
  let healthPlan: HealthPlanAggregate;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
        MongooseModule.forFeature([
          { name: Pet.name, schema: PetSchema },
          { name: User.name, schema: UserSchema },
          { name: HealthPlan.name, schema: HealthPlanSchema },
        ]),
      ],
      providers: [
        CreatePetUseCase,
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

    useCase = moduleRef.get<CreatePetUseCase>(CreatePetUseCase);
    userRepository = moduleRef.get<UserRepository>('UserRepository');
    healthPlanRepository = moduleRef.get<HealthPlanRepository>(
      'HealthPlanRepository',
    );

    user = await UserAggregate.createCustomer({
      name: 'Test User',
      email: 'test_user_create_pet@email.com',
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

  it('should create a new pet', async () => {
    // Arrange
    const pet = {
      name: 'Dog',
      breed: 'Golden Retriever',
      specie: 'Canis lupus familiaris',
      birthdate: '2020-01-01',
      userId: user.id,
      healthPlanId: healthPlan.id,
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
