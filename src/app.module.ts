import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import UserModule from './modules/user/user.module';
import PetsModule from './modules/pets/pets.module';
import HealthPlanModule from './modules/healthplan/healthplan.module';

@Module({
  imports: [
    UserModule,
    PetsModule,
    HealthPlanModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
