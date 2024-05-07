import { PetAggregate } from './pet';

describe('Pet Aggregate tests', () => {
  it('should create a pet', () => {
    const pet = PetAggregate.createPet({
      name: 'Dog',
      breed: 'Golden Retriever',
      specie: 'Canis lupus familiaris',
      birthdate: new Date('2020-01-01'),
      userId: '66396631435998b8e2033a2f',
    });

    expect(pet).toBeDefined();
    expect(pet.props.name).toBe('Dog');
    expect(pet.props.breed).toBe('Golden Retriever');
    expect(pet.props.specie).toBe('Canis lupus familiaris');
    expect(pet.props.birthdate.toISOString().slice(0, 10)).toBe('2020-01-01');
    expect(pet.props.userId).toBe('66396631435998b8e2033a2f');
  });

  it('should update pet properties', () => {
    const pet = PetAggregate.createPet({
      name: 'Dog',
      breed: 'Golden Retriever',
      specie: 'Canis lupus familiaris',
      birthdate: new Date('2020-01-01'),
      userId: '66396631435998b8e2033a2f',
    });

    pet.setName('Dog Updated');
    pet.setBreed('Golden Retriever Updated');
    pet.setSpecie('Canis lupus familiaris Updated');
    pet.setBirthdate(new Date('2021-01-01'));
    pet.setOwnerId('new-id');

    expect(pet).toBeDefined();
    expect(pet.props.name).toBe('Dog Updated');
    expect(pet.props.breed).toBe('Golden Retriever Updated');
    expect(pet.props.specie).toBe('Canis lupus familiaris Updated');
    expect(pet.props.birthdate.toISOString().slice(0, 10)).toBe('2021-01-01');
    expect(pet.props.userId).toBe('new-id');
  });

  it('show show the correct age of the pet', () => {
    const pet = PetAggregate.createPet({
      name: 'Dog',
      breed: 'Golden Retriever',
      specie: 'Canis lupus familiaris',
      birthdate: new Date('2000-01-01'),
      userId: '66396631435998b8e2033a2f',
    });

    expect(pet.age).toBe(24);
  });
});
