import { Inject, Injectable } from '@nestjs/common';
import { UserAggregate } from '../../domain/entities/user';
import { IUserRepository } from '../../repository/user-repository.interface';
import { IExceptionService } from 'src/core/domain/exceptions/exceptions.interface';

@Injectable()
export default class CreateCustomerUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('ExceptionsService')
    private readonly exceptionService: IExceptionService,
  ) {}
  async execute(input: Input): Promise<Output> {
    const result = await this.userRepository.findByEmail(input.email);
    if (result) {
      this.exceptionService.throwConflict({ message: 'User already exists' });
    }
    const user = await UserAggregate.createCustomer(input);
    await this.userRepository.create(user);
    return {
      id: user.id,
      email: user.props.email,
    };
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
};

type Output = {
  id: string;
  email: string;
};
