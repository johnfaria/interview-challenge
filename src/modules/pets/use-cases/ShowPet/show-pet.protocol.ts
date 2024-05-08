import { IsMongoId, IsString } from 'class-validator';

export class ShowPetDTO {
  @IsString()
  petId: string;

  @IsString()
  @IsMongoId()
  userId: string;
}
