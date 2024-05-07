import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role, Roles } from 'src/modules/auth/decorators/role.decorator';
import ShowPetsByUserIdUseCase from './show-pets-by-user-id.use-case';
import ShowPetsByUserIdDTO from './shot-pets-by-user-id.protocol';

@ApiTags('Pets')
@Controller('pets/list/')
export default class ShowPetsByUserIdController {
  constructor(
    @Inject('ShowPetsByUserIdUseCase')
    private readonly useCase: ShowPetsByUserIdUseCase,
  ) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Show pets by user id',
  })
  async execute(
    @JoinRequestParams({
      dto: ShowPetsByUserIdDTO,
    })
    dto: ShowPetsByUserIdDTO,
  ) {
    const result = await this.useCase.execute({
      userId: dto.userId,
    });
    return result;
  }
}
