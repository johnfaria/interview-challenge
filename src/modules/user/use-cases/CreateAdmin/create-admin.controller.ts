import { Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import CreateAdminDTO from './create-admin.protocols';
import CreateAdminUseCase from './create-admin.use-case';

@ApiTags('Users')
@Controller('user/admin/signup')
export default class CreateAdminController {
  constructor(
    @Inject('CreateAdminUseCase')
    private readonly useCase: CreateAdminUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create new admin',
  })
  @ApiBody({
    type: CreateAdminDTO,
  })
  @ApiResponse({
    status: 201,
    description: 'Admin created',
  })
  async execute(
    @JoinRequestParams({
      dto: CreateAdminDTO,
    })
    dto: CreateAdminDTO,
  ) {
    const result = await this.useCase.execute({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
    return result;
  }
}
