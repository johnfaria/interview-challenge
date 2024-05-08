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
import DeletePetUseCase from './delete-pet.use-case';
import { DeletePetDTO } from './delete-pet.protocol';

@ApiTags('Pets')
@Controller('pets/:petId')
export default class DeletePetController {
  constructor(
    @Inject('DeletePetUseCase')
    private readonly useCase: DeletePetUseCase,
  ) {}

  @Delete()
  @ApiBearerAuth()
  @Roles(Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Delete pet by id',
  })
  @ApiParam({
    name: 'petId',
    required: true,
    type: String,
  })
  @ApiBody({
    type: DeletePetDTO,
  })
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Pet deleted',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Pet not found',
  })
  async execute(
    @JoinRequestParams({
      dto: DeletePetDTO,
    })
    dto: DeletePetDTO,
  ) {
    await this.useCase.execute({
      userId: dto.userId,
      petId: dto.petId,
    });
  }
}
