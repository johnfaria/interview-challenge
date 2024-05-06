import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repository/user-repository.interface';
import { AuthService } from 'src/modules/auth/auth.service';
import { IExceptionService } from 'src/core/domain/exceptions/exceptions.interface';

@Injectable()
export default class UserLoginUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('AuthService') private readonly authService: AuthService,
    @Inject('ExceptionsService')
    private readonly exceptionService: IExceptionService,
  ) {}
  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user)
      this.exceptionService.notFoundException({ message: 'User not found' });
    const isValidPassword = await user.validatePassword(input.password);
    if (!isValidPassword) {
      this.exceptionService.unauthorizedException({
        message: 'Invalid password',
      });
    }
    const token = await this.authService.generateJwt({
      userId: user.id,
      email: user.props.email,
      roles: user.props.roles,
    });
    return token;
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  accessToken: string;
};
