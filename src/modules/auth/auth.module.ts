import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from 'src/core/infra/database/mongo/schemas/user.schema';
import MagicLinkStrategy from './strategies/magic-link.strategy';
import UserLoginMagicLinkController from './controllers/user-login-magic-link.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION },
      }),
    }),
  ],
  controllers: [UserLoginMagicLinkController],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthService,
    },
    JwtStrategy,
    MagicLinkStrategy,
  ],
  exports: ['AuthService'],
})
export class AuthModule {}
