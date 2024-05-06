import { pbkdf2, randomBytes } from 'crypto';
import { ValueObject } from 'src/core/domain/value-object';

class PasswordProps {
  readonly value: string;
  readonly salt: string;
}

export default class Password extends ValueObject<PasswordProps> {
  static passwordIterations: number = 100;
  static passwordKeylen: number = 64;
  static passwordDigest: string = 'sha512';

  static create(password: string, salt?: string): Promise<Password> {
    const generatedSalt = salt || randomBytes(20).toString('hex');
    return new Promise((resolve) => {
      pbkdf2(
        password,
        generatedSalt,
        Password.passwordIterations,
        Password.passwordKeylen,
        Password.passwordDigest,
        (_, value) => {
          resolve(
            new Password({ value: value.toString('hex'), salt: generatedSalt }),
          );
        },
      );
    });
  }

  async validate(plainPassword: string): Promise<boolean> {
    return new Promise((resolve) => {
      pbkdf2(
        plainPassword,
        this.props.salt,
        Password.passwordIterations,
        Password.passwordKeylen,
        Password.passwordDigest,
        (_, value) => {
          resolve(this.props.value === value.toString('hex'));
        },
      );
    });
  }
}
