import { Provider } from '@nestjs/common';
import UserLoginUseCase from './use-cases/UserLogin/user-login.use-case';
import CreateCustomerUseCase from './use-cases/CreateCustomer/create-customer.use-case';
import CreateAdminUseCase from './use-cases/CreateAdmin/create-admin.use-case';

const useCases: Provider[] = [
  {
    provide: 'CreateCustomerUseCase',
    useClass: CreateCustomerUseCase,
  },
  {
    provide: 'CreateAdminUseCase',
    useClass: CreateAdminUseCase,
  },
  {
    provide: 'UserLoginUseCase',
    useClass: UserLoginUseCase,
  },
];

export { useCases };
