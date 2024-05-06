import { UserAggregate } from './user';

describe('Domain Test: Aggregate User', () => {
  it('should create a valid customer', async () => {
    const user = await UserAggregate.createCustomer({
      name: 'Test',
      email: 'test@email.com',
      password: 'password',
    });
    expect(user).toBeDefined();
    expect(user.isCustomer()).toBeTruthy();
    expect(user.isAdmin()).toBeFalsy();
  });

  it('should create a valid admin', async () => {
    const user = await UserAggregate.createAdmin({
      name: 'Test',
      email: 'test@email.com',
      password: 'password',
    });
    expect(user).toBeDefined();
    expect(user.isAdmin()).toBeTruthy();
    expect(user.isCustomer()).toBeFalsy();
  });
});
