import { Provider } from '@nestjs/common';
import UserSignUpUseCase from './use-cases/UserSignUp/UserSignUp.use-case';
import UserLoginUseCase from './use-cases/UserLogin/UserLogin.use-case';

const useCases: Provider[] = [
  {
    provide: 'UserSignupUseCase',
    useClass: UserSignUpUseCase,
  },
  {
    provide: 'UserLoginUseCase',
    useClass: UserLoginUseCase,
  },
];

export { useCases };
