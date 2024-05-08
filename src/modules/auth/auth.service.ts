import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/infra/database/mongo/schemas/user.schema';

type GenerateJwtProps = {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(User.name) private userModel: Model<User>,
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

  async validateUser(email: string) {
    const user = await this.userModel.findOne({
      email,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
