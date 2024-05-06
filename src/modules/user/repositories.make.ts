import { Provider } from '@nestjs/common';
import { UserRepository } from './repository/user-repository';

const repositories: Provider[] = [
  {
    provide: 'UserRepository',
    useClass: UserRepository,
  },
];

export { repositories };
