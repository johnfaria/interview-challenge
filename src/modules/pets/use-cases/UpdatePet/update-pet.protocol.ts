import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsOptional } from 'class-validator';

export default class UpdatePetDTO {
  userId: string;

  @ApiProperty()
  @IsMongoId()
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
  @IsDateString()
  birthdate: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  newOwnerId: string;
}
