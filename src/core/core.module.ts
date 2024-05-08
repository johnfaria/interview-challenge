import { Module } from '@nestjs/common';
import { ExceptionsService } from './infra/exceptions/exceptions.service';
import { LoggerService } from './infra/logger/logger.service';
import { EnvironmentConfigService } from './infra/config/config.service';
import { ConfigModule } from '@nestjs/config';
import MailerService from './infra/email/email.service';

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
    {
      provide: 'MailerService',
      useClass: MailerService,
    },
    EnvironmentConfigService,
  ],
  exports: [
    'ExceptionsService',
    'LoggerService',
    'MailerService',
    EnvironmentConfigService,
  ],
})
export class CoreModule {}
