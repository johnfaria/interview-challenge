import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type GenerateJwtProps = {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(payload: {
    userId: string;
    email: string;
    roles: string[];
  }): Promise<GenerateJwtProps> {
    const accessToken = await this.jwtService.signAsync(
      { sub: payload.userId, email: payload.email, roles: payload.roles },
      {},
    );
    return { accessToken };
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
