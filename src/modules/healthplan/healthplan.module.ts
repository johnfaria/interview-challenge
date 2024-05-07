import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import {
  Pet,
  PetSchema,
} from 'src/core/infra/database/mongo/schemas/pet.schema';
import {
  User,
  UserSchema,
} from 'src/core/infra/database/mongo/schemas/user.schema';
import { useCases } from './use-case.make';
import { repositories } from './repositories.make';
import { controllers } from './controllers.make';
import {
  HealthPlan,
  HealthPlanSchema,
} from 'src/core/infra/database/mongo/schemas/healthplan.schema';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Pet.name, schema: PetSchema },
      { name: User.name, schema: UserSchema },
      { name: HealthPlan.name, schema: HealthPlanSchema },
    ]),
  ],
  controllers: controllers,
  providers: [...useCases, ...repositories],
  exports: [],
})
export default class HealthPlanModule {}
