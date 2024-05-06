import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import UserSignUpUseCase from './UserSignUp.use-case';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UserSignUpDTO from './UserSignUp.types';
import { User } from 'src/core/infra/database/mongo/schemas/user.schema';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role, Roles } from 'src/modules/auth/decorators/role.decorator';

@Controller('user/signup')
export default class UserSignUpController {
  constructor(
    @Inject('UserSignupUseCase')
    private readonly useCase: UserSignUpUseCase,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'SignUp User',
  })
  @ApiBody({
    type: UserSignUpDTO,
  })
  async execute(
    @JoinRequestParams({
      dto: UserSignUpDTO,
    })
    dto: UserSignUpDTO,
  ) {
    const result = await this.useCase.execute({
      email: dto.email,
      password: dto.password,
    });
    return result;
  }
}
