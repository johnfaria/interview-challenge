import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeleteHealthPlanDTO {
  userId: string;

  @ApiProperty()
  @IsMongoId()
  healthPlanId: string;
}
