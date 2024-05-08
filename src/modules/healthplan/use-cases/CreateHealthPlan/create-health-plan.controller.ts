import { Controller, HttpCode, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role, Roles } from 'src/modules/auth/decorators/role.decorator';
import { CreateHealthPlanDTO } from './create-health-plan.protocol';
import CreateHealthPlanUseCase from './create-health-plan.use-case';

@ApiTags('Health Plans')
@Controller('healthplan/')
export default class CreateHealthPlanController {
  constructor(
    @Inject('CreateHealthPlanUseCase')
    private readonly useCase: CreateHealthPlanUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Create a health plan',
  })
  @ApiBody({
    type: CreateHealthPlanDTO,
  })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Health Plan created',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async execute(
    @JoinRequestParams({
      dto: CreateHealthPlanDTO,
    })
    dto: CreateHealthPlanDTO,
  ) {
    const result = await this.useCase.execute({
      name: dto.name,
      description: dto.description,
      company: dto.company,
      price: dto.price,
      status: dto.status,
    });
    return result;
  }
}
