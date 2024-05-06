import { AggregateRoot } from 'src/core/domain/aggregate';
import { Types } from 'mongoose';
import Password from '../value-objects/Password';

type UserRole = 'customer' | 'admin';

interface UserProps {
  name: string;
  email: string;
  password: Password;
  roles: UserRole[];
}

class UserAggregate extends AggregateRoot<UserProps> {
  static async createCustomer(props: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserAggregate> {
    const newObjectId = new Types.ObjectId();
    return new UserAggregate(newObjectId.toString(), {
      name: props.name,
      email: props.email,
      password: await Password.create(props.password, process.env.SALT),
      roles: ['customer'],
    });
  }

  static async createAdmin(props: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserAggregate> {
    const newObjectId = new Types.ObjectId();
    return new UserAggregate(newObjectId.toString(), {
      name: props.name,
      email: props.email,
      password: await Password.create(props.password, process.env.SALT),
      roles: ['admin'],
    });
  }

  static restore(
    id: string,
    props: {
      name: string;
      email: string;
      password: string;
      salt: string;
      roles: UserRole[];
    },
  ): UserAggregate {
    return new UserAggregate(id, {
      name: props.name,
      email: props.email,
      password: new Password({ value: props.password, salt: props.salt }),
      roles: props.roles,
    });
  }

  async validatePassword(password: string): Promise<boolean> {
    return this.props.password.validate(password);
  }

  isCustomer(): boolean {
    return this.props.roles.includes('customer');
  }

  isAdmin(): boolean {
    return this.props.roles.includes('admin');
  }
}

export { UserAggregate };
