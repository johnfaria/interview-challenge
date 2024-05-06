export interface IRepository<Entity> {
  findById(entityId: string): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
  create(entity: Entity): Promise<void>;
  update(entity: Entity): Promise<void>;
}
