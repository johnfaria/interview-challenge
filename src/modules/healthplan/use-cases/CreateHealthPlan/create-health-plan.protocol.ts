import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateHealthPlanDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({ enum: ['active', 'inactive'] })
  @IsString()
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';
}
