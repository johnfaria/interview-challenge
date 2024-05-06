export interface IFormatExceptionMessage {
  message: string;
}

export interface IExceptionService {
  badRequestException(data: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  unauthorizedException(data?: IFormatExceptionMessage): void;
  notFoundException(data?: IFormatExceptionMessage): void;
  alreadyExistsException(data?: IFormatExceptionMessage): void;
}
