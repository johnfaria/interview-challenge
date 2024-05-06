import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('APP_PORT');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getDatabaseUrl(): number {
    return this.configService.get<number>('DATABASE_URL');
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}
