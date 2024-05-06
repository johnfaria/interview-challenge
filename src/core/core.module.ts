import { Module } from '@nestjs/common';
import { ExceptionsService } from './infra/exceptions/exceptions.service';
import { LoggerService } from './infra/logger/logger.service';
import { EnvironmentConfigService } from './infra/config/config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ExceptionsService',
      useClass: ExceptionsService,
    },
    {
      provide: 'LoggerService',
      useValue: LoggerService,
    },
    EnvironmentConfigService,
  ],
  exports: ['ExceptionsService', 'LoggerService', EnvironmentConfigService],
})
export class CoreModule {}
