import { Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserLoginUseCase from './user-login.use-case';
import UserLoginDTO from './user-login.protocols';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';

@ApiTags('Auth')
@Controller('user/signin')
export default class UserLoginController {
  constructor(
    @Inject('UserLoginUseCase')
    private readonly useCase: UserLoginUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'User login',
  })
  @ApiBody({
    type: UserLoginDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
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
