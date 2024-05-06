import { AggregateRoot } from 'src/core/domain/aggregate';
import { Types } from 'mongoose';
import Password from '../value-objects/Password';

interface UserProps {
  email: string;
  password: Password;
  roles?: string[];
}

class UserAggregate extends AggregateRoot<UserProps> {
  static async create(props: {
    email: string;
    password: string;
  }): Promise<UserAggregate> {
    const newObjectId = new Types.ObjectId();
    return new UserAggregate(newObjectId.toString(), {
      email: props.email,
      password: await Password.create(props.password, process.env.SALT),
      roles: ['user'],
    });
  }

  static restore(
    id: string,
    props: { email: string; password: string; salt: string; roles?: string[] },
  ): UserAggregate {
    return new UserAggregate(id, {
      email: props.email,
      password: new Password({ value: props.password, salt: props.salt }),
      roles: props.roles,
    });
  }

  async validatePassword(password: string): Promise<boolean> {
    return this.props.password.validate(password);
  }
}

export { UserAggregate };
