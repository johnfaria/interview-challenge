import { Types } from 'mongoose';
import { AggregateRoot } from 'src/core/domain/aggregate';

interface PetProps {
  name: string;
  breed: string;
  specie: string;
  birthdate: Date;
  userId: string;
  healthPlanId: string;
}

export class PetAggregate extends AggregateRoot<PetProps> {
  private constructor(id: string, props: PetProps) {
    super(id, props);
  }

  static createPet(props: {
    name: string;
    breed: string;
    specie: string;
    birthdate: Date;
    userId: string;
    healthPlanId: string;
  }): PetAggregate {
    const newObjectId = new Types.ObjectId();
    return new PetAggregate(newObjectId.toString(), {
      name: props.name,
      breed: props.breed,
      specie: props.specie,
      birthdate: props.birthdate,
      userId: props.userId,
      healthPlanId: props.healthPlanId,
    });
  }

  static restore(
    id: string,
    props: {
      name: string;
      breed: string;
      specie: string;
      birthdate: Date;
      userId: string;
      healthPlanId: string;
    },
  ): PetAggregate {
    return new PetAggregate(id, {
      name: props.name,
      breed: props.breed,
      specie: props.specie,
      birthdate: props.birthdate,
      userId: props.userId,
      healthPlanId: props.healthPlanId,
    });
  }

  get age(): number {
    const diff = Date.now() - this.props.birthdate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  verifyOwnership(userId: string): boolean {
    return this.props.userId === userId;
  }

  setName(name: string): void {
    this.props.name = name;
  }

  setBreed(breed: string): void {
    this.props.breed = breed;
  }

  setSpecie(specie: string): void {
    this.props.specie = specie;
  }

  setBirthdate(birthdate: Date): void {
    this.props.birthdate = birthdate;
  }

  setOwnerId(userId: string): void {
    this.props.userId = userId;
  }
}
