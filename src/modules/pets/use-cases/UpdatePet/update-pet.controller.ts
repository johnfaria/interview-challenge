import { Controller, HttpCode, Inject, Put, UseGuards } from '@nestjs/common';
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
import UpdatePetUseCase from './update-pet.use-case';
import UpdatePetDTO from './update-pet.protocol';

@ApiTags('Pets')
@Controller('pets/:petId')
export default class UpdatePetController {
  constructor(
    @Inject('UpdatePetUseCase')
    private readonly useCase: UpdatePetUseCase,
  ) {}

  @Put()
  @ApiBearerAuth()
  @Roles(Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Update pet by id',
  })
  @ApiParam({
    name: 'petId',
    required: true,
    type: String,
  })
  @ApiBody({
    type: UpdatePetDTO,
  })
  @HttpCode(204)
  async execute(
    @JoinRequestParams({
      dto: UpdatePetDTO,
    })
    dto: UpdatePetDTO,
  ) {
    await this.useCase.execute({
      petId: dto.petId,
      userId: dto.userId,
      name: dto.name,
      breed: dto.breed,
      specie: dto.specie,
      birthdate: dto.birthdate,
      newOwnerId: dto.newOwnerId,
    });
  }
}
