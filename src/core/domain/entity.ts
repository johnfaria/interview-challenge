const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};

interface EntityProps {
  [index: string]: any;
}

abstract class Entity<Props extends EntityProps> {
  protected constructor(
    readonly id: string,
    readonly props: Props,
  ) {}

  equals(entity: Entity<Props>): boolean {
    if (!entity || !isEntity(entity)) {
      return false;
    }

    if (this.id === entity.id) {
      return true;
    }

    return false;
  }
}

export default Entity;
