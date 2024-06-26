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
import ShowPetsByUserIdUseCase from './show-pets-by-user-id.use-case';
import {
  HealthPlan,
  HealthPlanSchema,
} from 'src/core/infra/database/mongo/schemas/healthplan.schema';
import HealthPlanRepository from 'src/modules/healthplan/repositories/healthplan.repository';
import HealthPlanAggregate from 'src/modules/healthplan/domain/entities/healthplan';

describe('ShowPetsByUserIdUseCase tests', () => {
  let useCase: ShowPetsByUserIdUseCase;
  let petRepository: IPetRepository;
  let userRepository: IUserRepository;
  let user: UserAggregate;
  let healthPlanRepository: HealthPlanRepository;
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
        ShowPetsByUserIdUseCase,
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

    useCase = moduleRef.get(ShowPetsByUserIdUseCase);
    petRepository = moduleRef.get<IPetRepository>('PetRepository');
    userRepository = moduleRef.get<IUserRepository>('UserRepository');
    healthPlanRepository = moduleRef.get<HealthPlanRepository>(
      'HealthPlanRepository',
    );

    user = await UserAggregate.createCustomer({
      name: 'Test User Show Pet By Id',
      email: 'test_user_show_pet_by_id@email.com',
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

  it('should show pets by user', async () => {
    const pet1 = PetAggregate.createPet({
      name: 'Dog',
      breed: 'Golden Retriever',
      specie: 'Canis lupus familiaris',
      birthdate: new Date('2020-01-01'),
      userId: user.id,
      healthPlanId: healthPlan.id,
    });
    const pet2 = PetAggregate.createPet({
      name: 'Cat',
      breed: 'Persian',
      specie: 'Felis catus',
      birthdate: new Date('2020-01-01'),
      userId: user.id,
      healthPlanId: healthPlan.id,
    });
    const pet3 = PetAggregate.createPet({
      name: 'Bird',
      breed: 'Canary',
      specie: 'Serinus canaria',
      birthdate: new Date('2020-01-01'),
      userId: user.id,
      healthPlanId: healthPlan.id,
    });
    await petRepository.create(pet1);
    await petRepository.create(pet2);
    await petRepository.create(pet3);
    // Arrange
    const dto = {
      userId: user.id,
    };
    // Act
    const result = await useCase.execute(dto);
    // Assert
    expect(result.length).toBe(3);
    expect(result).toEqual([
      {
        id: pet1.id,
        name: pet1.props.name,
        breed: pet1.props.breed,
        specie: pet1.props.specie,
        birthdate: pet1.props.birthdate.toISOString().slice(0, 10),
        userId: pet1.props.userId,
        healthPlanId: pet1.props.healthPlanId,
      },
      {
        id: pet2.id,
        name: pet2.props.name,
        breed: pet2.props.breed,
        specie: pet2.props.specie,
        birthdate: pet2.props.birthdate.toISOString().slice(0, 10),
        userId: pet2.props.userId,
        healthPlanId: pet2.props.healthPlanId,
      },
      {
        id: pet3.id,
        name: pet3.props.name,
        breed: pet3.props.breed,
        specie: pet3.props.specie,
        birthdate: pet3.props.birthdate.toISOString().slice(0, 10),
        userId: pet3.props.userId,
        healthPlanId: pet3.props.healthPlanId,
      },
    ]);
  });
});
