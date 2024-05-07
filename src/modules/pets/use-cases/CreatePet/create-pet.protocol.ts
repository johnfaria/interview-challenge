import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class CreatePetDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  specie: string;

  @ApiProperty()
  @IsDateString()
  birthdate: string;

  userId: string;
}
