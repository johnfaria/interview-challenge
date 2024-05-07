import { Inject } from '@nestjs/common';
import { IExceptionService } from 'src/core/domain/exceptions/exceptions.interface';

export default class UpdateHealthPlanUseCase {
  constructor(
    @Inject('ExceptionsService')
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(_: Input): Promise<Output> {}
}

type Input = any;

type Output = any;
