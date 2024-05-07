import { ApiProperty } from '@nestjs/swagger';

export class ShowHealthPlanDTO {
  userId: string;

  @ApiProperty()
  healthPlanId: string;
}
