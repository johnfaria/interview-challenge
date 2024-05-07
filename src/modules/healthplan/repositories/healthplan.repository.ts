import { HealthPlan } from 'src/core/infra/database/mongo/schemas/healthplan.schema';
import HealthPlanAggregate from '../domain/entities/healthplan';
import IHealthPlanRepository from './healplan.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export default class HealthPlanRepository implements IHealthPlanRepository {
  constructor(
    @InjectModel(HealthPlan.name) private healthPlanModel: Model<HealthPlan>,
  ) {}

  async findById(entityId: string): Promise<HealthPlanAggregate | null> {
    const healthPlan = await this.healthPlanModel.findById(entityId);
    if (!healthPlan) return null;
    return HealthPlanAggregate.restore(healthPlan.id, {
      name: healthPlan.name,
      description: healthPlan.description,
      company: healthPlan.company,
      price: healthPlan.price,
      status: healthPlan.status,
    });
  }

  async create(entity: HealthPlanAggregate): Promise<void> {
    const healthPlan = await this.healthPlanModel.create({
      _id: entity.id,
      name: entity.props.name,
      description: entity.props.description,
      company: entity.props.company,
      price: entity.props.price,
      status: entity.props.status,
    });
    await healthPlan.save();
  }

  async update(entity: HealthPlanAggregate): Promise<void> {
    await this.healthPlanModel.updateOne(
      { _id: entity.id },
      {
        name: entity.props.name,
        description: entity.props.description,
        company: entity.props.company,
        price: entity.props.price,
        status: entity.props.status,
      },
    );
  }

  async delete(entityId: string): Promise<void> {
    await this.healthPlanModel.deleteOne({ _id: entityId });
  }

  findAll(): Promise<HealthPlanAggregate[]> {
    throw new Error('Method not implemented.');
  }
}
