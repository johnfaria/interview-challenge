import { Module } from '@nestjs/common';
import { controllers } from './controllers.make';
import { useCases } from './use-cases.make';
import { MongooseModule } from '@nestjs/mongoose';
import { repositories } from './repositories.make';
import { AuthModule } from '../auth/auth.module';
import {
  User,
  UserSchema,
} from 'src/core/infra/database/mongo/schemas/user.schema';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers,
  providers: [...useCases, ...repositories],
  exports: [],
})
export default class UserModule {}
