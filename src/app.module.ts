import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import UserModule from './modules/user/user.module';
import PetsModule from './modules/pets/pets.module';
import HealthPlanModule from './modules/healthplan/healthplan.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    UserModule,
    PetsModule,
    HealthPlanModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    CacheModule.register({
      isGlobal: true,
      max: 10,
      ttl: 5,
      store: redisStore,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [],
})
export class AppModule {}
