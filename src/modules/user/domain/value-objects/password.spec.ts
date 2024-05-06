import Password from './Password';

describe('Domain tests - Password Value Object', () => {
  it('Should create a new password value object', () => {
    const password = new Password({ value: 'foo', salt: 'bar' });
    expect(password).toBeDefined();
  });

  it('Should be equal if the passwords have the same values', () => {
    const password1 = new Password({ value: 'foo', salt: 'bar' });
    const password2 = new Password({ value: 'foo', salt: 'bar' });
    expect(password1.equals(password2)).toBe(true);
  });

  it('Should not be equal if the passwords do not have the same values', () => {
    const password1 = new Password({ value: 'foo', salt: 'bar' });
    const password2 = new Password({ value: 'bar', salt: 'foo' });
    expect(password1.equals(password2)).toBe(false);
  });

  it('Should create a new password value object using static method', async () => {
    const password = await Password.create('foo');
    expect(password).toBeDefined();
  });

  it('Should validate a password', async () => {
    const password = await Password.create('foo', 'bar');
    const isValid = await password.validate('foo');
    expect(isValid).toBe(true);
  });
});
