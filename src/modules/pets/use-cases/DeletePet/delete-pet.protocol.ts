import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class DeletePetDTO {
  userId: string;

  @ApiProperty()
  @IsString()
  @IsMongoId()
  petId: string;
}
