import { Controller, Get, HttpCode, Inject, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role, Roles } from 'src/modules/auth/decorators/role.decorator';
import { ShowHealthPlanDTO } from './show-health-plan.protocol';
import ShowHealthPlanUseCase from './show-health-plan.use-case';

@ApiTags('Health Plans')
@Controller('healthplan/:healthPlanId')
export default class ShowHealthPlanController {
  constructor(
    @Inject('ShowHealthPlanUseCase')
    private readonly useCase: ShowHealthPlanUseCase,
  ) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Show a health plan',
  })
  @ApiBody({
    type: ShowHealthPlanDTO,
  })
  @ApiParam({
    name: 'healthPlanId',
    type: 'string',
    required: true,
  })
  @HttpCode(200)
  async execute(
    @JoinRequestParams({
      dto: ShowHealthPlanDTO,
    })
    dto: ShowHealthPlanDTO,
  ) {
    const result = await this.useCase.execute(dto);
    return result;
  }
}
