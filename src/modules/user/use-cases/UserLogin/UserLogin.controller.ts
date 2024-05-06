import { Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import UserLoginUseCase from './UserLogin.use-case';
import UserLoginDTO from './UserLogin.types';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';

@Controller('user/signin')
export default class UserLoginController {
  constructor(
    @Inject('UserLoginUseCase')
    private readonly useCase: UserLoginUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'SignIn User',
  })
  @ApiBody({
    type: UserLoginDTO,
  })
  async execute(
    @JoinRequestParams({
      dto: UserLoginDTO,
    })
    dto: UserLoginDTO,
  ) {
    const result = await this.useCase.execute({
      email: dto.email,
      password: dto.password,
    });
    return result;
  }
}
