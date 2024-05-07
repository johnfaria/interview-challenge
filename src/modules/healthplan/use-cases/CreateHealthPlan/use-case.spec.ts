import { Test } from '@nestjs/testing';
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
import CreateHealthPlanUseCase from './create-health-plan.use-case';
import HealthPlanRepository from '../../repositories/healthplan.repository';

describe('CreateHealthPlanUseCase', () => {
  let useCase: CreateHealthPlanUseCase;
  // let healPlanRepository: IHealthPlanRepository;

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
        CreateHealthPlanUseCase,
        {
          provide: 'HealthPlanRepository',
          useClass: HealthPlanRepository,
        },
      ],
    }).compile();

    useCase = moduleRef.get(CreateHealthPlanUseCase);
    // petRepository = moduleRef.get('PetRepository');
  });

  it('should create a new health plan', async () => {
    // Arrange
    const input = {
      name: 'Golden Plan',
      description: 'The best plan ever',
      company: 'Golden Health',
      price: 100,
      status: 'active' as const,
    };
    // Act
    const result = await useCase.execute(input);
    // Assert
    expect(result).toEqual({
      id: expect.any(String),
      ...input,
    });
  });
});
