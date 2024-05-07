import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role, Roles } from 'src/modules/auth/decorators/role.decorator';
import ShowPetUseCase from './show-pet.use-case';
import { ShowPetDTO } from './show-pet.protocol';

@ApiTags('Pets')
@Controller('pets/:petId')
export default class ShowPetController {
  constructor(
    @Inject('ShowPetUseCase')
    private readonly useCase: ShowPetUseCase,
  ) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Show pet by id',
  })
  @ApiParam({
    name: 'petId',
    required: true,
    type: String,
  })
  async execute(
    @JoinRequestParams({
      dto: ShowPetDTO,
    })
    dto: ShowPetDTO,
  ) {
    const result = await this.useCase.execute({
      userId: dto.userId,
      petId: dto.petId,
    });
    return result;
  }
}
