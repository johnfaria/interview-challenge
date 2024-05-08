import {
  Controller,
  Delete,
  HttpCode,
  Inject,
  UseGuards,
} from '@nestjs/common';
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
import { DeleteHealthPlanDTO } from './delete-health-plan.protocol';
import DeleteHealthPlanUseCase from './delete-health-plan.use-case';

@ApiTags('Health Plans')
@Controller('healthplan/:healthPlanId')
export default class DeleteHealthPlanController {
  constructor(
    @Inject('DeleteHealthPlanUseCase')
    private readonly useCase: DeleteHealthPlanUseCase,
  ) {}

  @Delete()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Delete a health plan',
  })
  @ApiBody({
    type: DeleteHealthPlanDTO,
  })
  @ApiParam({
    name: 'healthPlanId',
    type: 'string',
    required: true,
  })
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Health plan deleted',
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
      dto: DeleteHealthPlanDTO,
    })
    dto: DeleteHealthPlanDTO,
  ) {
    await this.useCase.execute(dto);
  }
}
