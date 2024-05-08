import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsString()
  @IsMongoId()
  healthPlanId: string;

  userId: string;
}
