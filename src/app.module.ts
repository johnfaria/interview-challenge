import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import UserModule from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
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
