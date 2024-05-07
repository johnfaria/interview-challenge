import { Provider } from '@nestjs/common';
import { PetRepository } from './repository/pet.repository';

export const repositories: Provider[] = [
  {
    provide: 'PetRepository',
    useClass: PetRepository,
  },
];
