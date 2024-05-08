import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type GenerateJwtProps = {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async generateJwt(payload: {
    userId: string;
    email: string;
    roles: string[];
  }): Promise<GenerateJwtProps> {
    const cashedToken = await this.cacheManager.get<string>(payload.userId);

    if (!cashedToken) {
      const accessToken = await this.jwtService.signAsync(
        { sub: payload.userId, email: payload.email, roles: payload.roles },
        {},
      );
      await this.cacheManager.set(payload.userId, accessToken, 10);
      return { accessToken };
    }

    return { accessToken: cashedToken };
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
