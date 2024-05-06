import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import CreateCustomerDTO from './create-customer.protocols';
import { JoinRequestParams } from 'src/core/infra/decorator/join-parameters.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role, Roles } from 'src/modules/auth/decorators/role.decorator';
import CreateCustomerUseCase from './create-customer.use-case';

@Controller('user/customer/signup')
export default class CreateCustomerController {
  constructor(
    @Inject('CreateCustomerUseCase')
    private readonly useCase: CreateCustomerUseCase,
  ) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Create new customer',
  })
  @ApiBody({
    type: CreateCustomerDTO,
  })
  @ApiBearerAuth()
  async execute(
    @JoinRequestParams({
      dto: CreateCustomerDTO,
    })
    dto: CreateCustomerDTO,
  ) {
    const result = await this.useCase.execute({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
    return result;
  }
}
