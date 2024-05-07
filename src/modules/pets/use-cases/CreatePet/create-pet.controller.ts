import { Controller, HttpCode, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role, Roles } from 'src/modules/auth/decorators/role.decorator';
import CreatePetUseCase from './create-pet.use-case';
import { CreatePetDTO } from './create-pet.protocol';

@ApiTags('Pets')
@Controller('pets/')
export default class CreatePetController {
  constructor(
    @Inject('CreatePetUseCase')
    private readonly useCase: CreatePetUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Create a pet',
  })
  @ApiBody({
    type: CreatePetDTO,
  })
  @HttpCode(201)
  async execute(
    @JoinRequestParams({
      dto: CreatePetDTO,
    })
    dto: CreatePetDTO,
  ) {
    const result = await this.useCase.execute({
      name: dto.name,
      breed: dto.breed,
      specie: dto.specie,
      birthdate: dto.birthdate,
      userId: dto.userId,
    });
    return result;
  }
}
