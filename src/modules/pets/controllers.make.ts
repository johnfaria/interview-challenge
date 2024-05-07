import CreatePetController from './use-cases/CreatePet/create-pet.controller';
import DeletePetController from './use-cases/DeletePet/delete-pet.controller';
import ShowPetController from './use-cases/ShowPet/show-pet.controller';
import ShowPetsByUserIdController from './use-cases/ShowPetsByUserId/show-pets-by-user-id.controller';
import UpdatePetController from './use-cases/UpdatePet/update-pet.controller';

export const controllers = [
  CreatePetController,
  ShowPetsByUserIdController,
  ShowPetController,
  DeletePetController,
  UpdatePetController,
];
