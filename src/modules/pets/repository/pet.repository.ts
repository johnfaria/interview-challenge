import { Pet } from 'src/core/infra/database/mongo/schemas/pet.schema';
import { PetAggregate } from '../domain/entities/pet';
import { IPetRepository } from './pet.repository.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/core/infra/database/mongo/schemas/user.schema';

export class PetRepository implements IPetRepository {
  constructor(
    @InjectModel(Pet.name) private petModel: Model<Pet>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findById(entityId: string): Promise<PetAggregate | null> {
    const data = await this.petModel.findById(entityId).populate('user');
    if (!data) return null;
    return PetAggregate.restore(data.id, {
      name: data.name,
      breed: data.breed,
      specie: data.specie,
      birthdate: data.birthdate,
      userId: data.user.id.toString(),
      healthPlanId: data.healthplan.toString(),
    });
  }

  async findAllPetsByUserId(userId: string): Promise<PetAggregate[]> {
    const pets = await this.petModel.find({
      user: new Types.ObjectId(userId),
    });
    return pets.map((pet) =>
      PetAggregate.restore(pet.id, {
        name: pet.name,
        breed: pet.breed,
        specie: pet.specie,
        birthdate: pet.birthdate,
        userId: pet.user.toString(),
        healthPlanId: pet.healthplan.toString(),
      }),
    );
  }

  async create(entity: PetAggregate): Promise<void> {
    await this.petModel.create({
      _id: entity.id,
      name: entity.props.name,
      breed: entity.props.breed,
      specie: entity.props.specie,
      birthdate: entity.props.birthdate,
      user: new Types.ObjectId(entity.props.userId),
      healthplan: new Types.ObjectId(entity.props.healthPlanId),
    });
  }

  async update(entity: PetAggregate): Promise<void> {
    await this.petModel.updateOne(
      { _id: entity.id },
      {
        name: entity.props.name,
        breed: entity.props.breed,
        specie: entity.props.specie,
        birthdate: entity.props.birthdate,
        user: new Types.ObjectId(entity.props.userId),
        healthplan: new Types.ObjectId(entity.props.healthPlanId),
      },
    );
  }

  async delete(entityId: string): Promise<void> {
    await this.petModel.deleteOne({ _id: entityId });
  }

  findAll(): Promise<PetAggregate[]> {
    throw new Error('Method not implemented.');
  }
}
