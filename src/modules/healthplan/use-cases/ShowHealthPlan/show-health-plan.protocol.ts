import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ShowHealthPlanDTO {
  userId: string;

  @ApiProperty()
  @IsMongoId()
  healthPlanId: string;
}
