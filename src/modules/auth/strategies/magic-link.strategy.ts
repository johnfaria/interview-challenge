import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthService } from '../auth.service';
import MailerService from 'src/core/infra/email/email.service';

@Injectable()
export default class MagicLinkStrategy extends PassportStrategy(
  Strategy,
  'magic-link',
) {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
    @Inject('MailerService') private readonly mailerService: MailerService,
  ) {
    super({
      secret: process.env.JWT_SECRET,
      callbackUrl: process.env.MAGIC_LINK_CALLBACK,
      jwtOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
      sendMagicLink: async (destination: string, href: string) => {
        await this.mailerService.sendEMail({
          to: destination,
          subject: 'Magic Link',
          html: `Click <a href="${href}">here</a> to sign in.`,
        });
      },
      verify: async (payload, callback) => {
        callback(null, this.validate(payload));
      },
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.destination);
    return {
      userId: user._id.toString(),
      email: user.email,
      roles: user.roles,
    };
  }
}
