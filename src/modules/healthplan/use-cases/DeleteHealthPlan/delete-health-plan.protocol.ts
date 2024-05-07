import { ApiProperty } from '@nestjs/swagger';

export class DeleteHealthPlanDTO {
  userId: string;

  @ApiProperty()
  healthPlanId: string;
}
