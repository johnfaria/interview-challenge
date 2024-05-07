import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import {
  Pet,
  PetSchema,
} from 'src/core/infra/database/mongo/schemas/pet.schema';
import { useCases } from './use-cases.make';
import { repositories } from './repositories.make';
import {
  User,
  UserSchema,
} from 'src/core/infra/database/mongo/schemas/user.schema';
import { controllers } from './controllers.make';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Pet.name, schema: PetSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: controllers,
  providers: [...useCases, ...repositories],
  exports: [],
})
export default class PetsModule {}
