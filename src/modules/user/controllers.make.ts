import { Type } from '@nestjs/common';
import CreateCustomerController from './use-cases/CreateCustomer/create-customer.controller';
import UserLoginController from './use-cases/UserLogin/user-login.controller';
import CreateAdminController from './use-cases/CreateAdmin/create-admin.controller';

const controllers: Type<any>[] = [
  CreateCustomerController,
  CreateAdminController,
  UserLoginController,
];

export { controllers };
