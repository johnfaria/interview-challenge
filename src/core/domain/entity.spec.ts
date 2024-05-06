import Entity from './entity';

interface TestEntityProps {
  foo: number;
  bar: boolean;
}

class TestEntity extends Entity<TestEntityProps> {
  static create(props: TestEntityProps) {
    if (!props) {
      throw new Error('Parameters must be defined');
    }
    const id = crypto.randomUUID();
    return new TestEntity(id, props);
  }

  static restore(id: string, props: TestEntityProps) {
    if (!id || !props) {
      throw new Error('Parameters must be defined');
    }
    return new TestEntity(id, props);
  }
}

describe('Domain tests - Entity', () => {
  it('Should create a new entity based on an Abstract Class', () => {
    const entity = TestEntity.create({ foo: 123, bar: true });
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(Entity);
    expect(entity).toBeInstanceOf(TestEntity);
  });

  it('Should restore a new entity based on an Abstract Class', () => {
    const entityId = '1234';
    const entity = TestEntity.restore(entityId, { foo: 123, bar: true });
    expect(entity).toBeDefined();
    expect(entity).toBeInstanceOf(Entity);
    expect(entity).toBeInstanceOf(TestEntity);
    expect(entity.id).toBe(entityId);
  });

  it('On create, should throw an error if props is undefined', () => {
    expect(() => TestEntity.create(null)).toThrowError();
  });

  it('On restore, should throw an error if id is undefined', () => {
    const entityId = null;
    expect(() =>
      TestEntity.restore(entityId, { foo: 123, bar: true }),
    ).toThrowError();
  });

  it('On restore, should throw an error if props is undefined', () => {
    expect(() => TestEntity.restore('1234', null)).toThrowError();
  });
});
