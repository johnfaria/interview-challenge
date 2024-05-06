import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const JoinRequestParams = createParamDecorator(
  async ({ data, dto }: JoinRequestParamsProps, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const result = plainToClass(dto, {
      ...request.body,
      ...request.params,
      ...request.query,
    });

    const errors = await validate(result);
    const errorMessages = errors
      .map((error) =>
        error?.constraints ? Object.values(error.constraints) : null,
      )
      .flat()
      .filter((error) => !!error);

    if (errorMessages.length > 0) throw new BadRequestException(errorMessages);

    return data ? result?.[data] : result;
  },
);
type Newable = { new (...args: any[]) };
type JoinRequestParamsProps = {
  data?: string;
  dto: Newable;
};
