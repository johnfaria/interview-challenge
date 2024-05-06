import { Type } from '@nestjs/common';
import UserSignUpController from './use-cases/UserSignUp/UserSignUp.controller';
import UserLoginController from './use-cases/UserLogin/UserLogin.controller';

const controllers: Type<any>[] = [UserSignUpController, UserLoginController];

export { controllers };
