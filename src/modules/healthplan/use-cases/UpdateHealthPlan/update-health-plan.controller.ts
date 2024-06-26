import { Controller, HttpCode, Inject, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role, Roles } from 'src/modules/auth/decorators/role.decorator';
import { UpdateHealthPlanDTO } from './update-health-plan.protocol';
import UpdateHealthPlanUseCase from './update-health-plan.use-case';

@ApiTags('Health Plans')
@Controller('healthplan/:healthPlanId')
export default class UpdateHealthPlanController {
  constructor(
    @Inject('UpdateHealthPlanUseCase')
    private readonly useCase: UpdateHealthPlanUseCase,
  ) {}

  @Put()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Update a health plan',
  })
  @ApiBody({
    type: UpdateHealthPlanDTO,
  })
  @ApiParam({
    name: 'healthPlanId',
    type: 'string',
    required: true,
  })
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Health plan updated',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Health plan not found',
  })
  async execute(
    @JoinRequestParams({
      dto: UpdateHealthPlanDTO,
    })
    dto: UpdateHealthPlanDTO,
  ) {
    await this.useCase.execute(dto);
  }
}
