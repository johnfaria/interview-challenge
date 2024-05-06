import { InjectModel } from '@nestjs/mongoose';
import { UserAggregate } from '../domain/entities/User';
import { IUserRepository } from './user-repository.interface';
import { Model } from 'mongoose';
import { User } from 'src/core/infra/database/mongo/schemas/user.schema';

class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findById(entityId: string): Promise<UserAggregate | null> {
    const user = await this.userModel.findOne({ _id: entityId });
    if (!user) return null;
    const roles = user.roles as ('customer' | 'admin')[];
    return UserAggregate.restore(user._id.toString(), {
      email: user.email,
      password: user.password,
      salt: process.env.SALT,
      roles: roles,
    });
  }

  async findByEmail(email: string): Promise<UserAggregate | null> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) return null;
    const roles = user.roles as ('customer' | 'admin')[];
    return UserAggregate.restore(user._id.toString(), {
      email: user.email,
      password: user.password,
      salt: process.env.SALT,
      roles: roles,
    });
  }

  async create(entity: UserAggregate): Promise<void> {
    const user = new this.userModel({
      _id: entity.id,
      email: entity.props.email,
      password: entity.props.password.props.value,
      roles: entity.props.roles,
    });
    user.save();
  }

  update(_: UserAggregate): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<UserAggregate[]> {
    throw new Error('Method not implemented.');
  }
}

export { UserRepository };