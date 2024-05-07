import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export default class UpdatePetDTO {
  userId: string;
  petId: string;

  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  breed: string;

  @ApiProperty()
  @IsOptional()
  specie: string;

  @ApiProperty()
  @IsOptional()
  birthdate: string;

  @ApiProperty()
  @IsOptional()
  newOwnerId: string;
}
