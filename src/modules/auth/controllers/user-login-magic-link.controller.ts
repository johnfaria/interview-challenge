import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import MagicLinkStrategy from 'src/modules/auth/strategies/magic-link.strategy';
import { Request, Response } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
import { IsEmail, IsString } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';

class PasswordlessLoginDTO {
  @IsString()
  @IsEmail()
  destination: string;
}

@ApiTags('Auth')
@Controller('user/signin/')
export default class UserLoginMagicLinkController {
  constructor(
    @Inject(MagicLinkStrategy) private strategy: MagicLinkStrategy,
    @Inject('AuthService') private authService: AuthService,
  ) {}

  @Post('link')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: PasswordlessLoginDTO,
  ) {
    const { destination } = body;
    await this.authService.validateUser(destination);
    this.strategy.send(req, res);
    return req.body;
  }

  @UseGuards(AuthGuard('magic-link'))
  @Get('link/callback')
  async callback(@Req() req: { user: any }) {
    return await this.authService.generateJwt(req.user);
  }
}
