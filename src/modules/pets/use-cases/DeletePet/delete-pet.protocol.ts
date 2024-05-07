import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeletePetDTO {
  userId: string;

  @ApiProperty()
  @IsString()
  petId: string;
}
