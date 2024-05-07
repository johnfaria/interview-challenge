import { IsString } from 'class-validator';

export class ShowPetDTO {
  @IsString()
  petId: string;

  @IsString()
  userId: string;
}
