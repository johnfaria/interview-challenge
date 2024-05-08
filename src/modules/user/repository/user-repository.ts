import { InjectModel } from '@nestjs/mongoose';
import { UserAggregate } from '../domain/entities/user';
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
      name: user.name,
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
      name: user.name,
      email: user.email,
      password: user.password,
      salt: process.env.SALT,
      roles: roles,
    });
  }

  async create(entity: UserAggregate): Promise<void> {
    await this.userModel.create({
      _id: entity.id,
      name: entity.props.name,
      email: entity.props.email,
      password: entity.props.password.props.value,
      roles: entity.props.roles,
    });
  }

  update(_: UserAggregate): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<UserAggregate[]> {
    throw new Error('Method not implemented.');
  }

  async delete(entityId: string): Promise<void> {
    await this.userModel.deleteOne({ _id: entityId });
  }
}

export { UserRepository };
