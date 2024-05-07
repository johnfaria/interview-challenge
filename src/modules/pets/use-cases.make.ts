import { Provider } from '@nestjs/common';
import CreatePetUseCase from './use-cases/CreatePet/create-pet.use-case';
import UpdatePetUseCase from './use-cases/UpdatePet/update-pet.use-case';
import DeletePetUseCase from './use-cases/DeletePet/delete-pet.use-case';
import ShowPetUseCase from './use-cases/ShowPet/show-pet.use-case';
import ShowPetsByUserIdUseCase from './use-cases/ShowPetsByUserId/show-pets-by-user-id.use-case';

export const useCases: Provider[] = [
  {
    provide: 'CreatePetUseCase',
    useClass: CreatePetUseCase,
  },
  {
    provide: 'ShowPetUseCase',
    useClass: ShowPetUseCase,
  },
  {
    provide: 'UpdatePetUseCase',
    useClass: UpdatePetUseCase,
  },
  {
    provide: 'DeletePetUseCase',
    useClass: DeletePetUseCase,
  },
  {
    provide: 'ShowPetsByUserIdUseCase',
    useClass: ShowPetsByUserIdUseCase,
  },
];
