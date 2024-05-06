import { ValueObject } from './value-object';

class TestValueObjectProps {
  foo: string;
  bar: boolean;
}

class TestValueObject extends ValueObject<TestValueObjectProps> {}

describe('Domain tests - Value Object', () => {
  it('Should create a new value object', () => {
    const vo1 = new TestValueObject({ foo: 'foo', bar: true });
    const vo2 = new TestValueObject({ foo: 'foo', bar: true });
    expect(vo1).toBeDefined();
    expect(vo2).toBeDefined();
  });

  it('Should be equal if the value objects have the same values', () => {
    const vo1 = new TestValueObject({ foo: 'foo', bar: true });
    const vo2 = new TestValueObject({ foo: 'foo', bar: true });
    expect(vo1.equals(vo2)).toBe(true);
  });

  it('Should not be equal if the value objects do not have the same values', () => {
    const vo1 = new TestValueObject({ foo: 'bar', bar: true });
    const vo2 = new TestValueObject({ foo: 'foo', bar: false });
    expect(vo1.equals(vo2)).toBe(false);
  });
});
