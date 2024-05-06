import { Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import CreateAdminDTO from './create-admin.protocols';
import CreateAdminUseCase from './create-admin.use-case';

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
  async execute(
    @JoinRequestParams({
      dto: CreateAdminDTO,
    })
    dto: CreateAdminDTO,
  ) {
    const result = await this.useCase.execute({
      email: dto.email,
      password: dto.password,
    });
    return result;
  }
}
