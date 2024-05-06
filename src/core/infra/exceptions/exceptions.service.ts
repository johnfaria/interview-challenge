import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IExceptionService,
  IFormatExceptionMessage,
} from 'src/core/domain/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IExceptionService {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }

  notFoundException(data?: IFormatExceptionMessage): void {
    throw new NotFoundException(data);
  }

  alreadyExistsException(data?: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
}
