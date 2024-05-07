import HealthPlanAggregate from './healthplan';

describe('Healthplan', () => {
  it('should create a new healthplan', () => {
    const healthPlan = HealthPlanAggregate.create({
      name: 'Health Plan',
      description: 'Complete health plan',
      company: 'Fake Company',
      price: 200,
      status: 'active',
    });

    expect(healthPlan).toBeDefined();
  });
});
