import { Inject, Injectable } from '@nestjs/common';
import { UserAggregate } from '../../domain/entities/User';
import { IUserRepository } from '../../repository/user-repository.interface';

@Injectable()
export default class UserSignUpUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const result = await this.userRepository.findByEmail(input.email);
    if (result) {
      throw new Error('Duplicated email');
    }
    const user = await UserAggregate.create(input);
    await this.userRepository.create(user);
    return {
      id: user.id,
      email: user.props.email,
    };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  id: string;
  email: string;
};
