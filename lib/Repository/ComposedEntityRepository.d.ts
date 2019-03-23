import { IEntityRepository } from "./IEntityRepository";
import { Query } from "../Model/Query";
export declare class ComposedEntityRepository<T extends {
    Id: number | string;
}> implements IEntityRepository<T> {
    protected PrimaryRepo: IEntityRepository<T>;
    protected SecondaryRepo: IEntityRepository<T>;
    protected SecondaryCondition: () => boolean;
    constructor(PrimaryRepo: IEntityRepository<T>, SecondaryRepo: IEntityRepository<T>, SecondaryCondition: () => boolean);
    GetById(Id: string | number): Promise<T>;
    Get(query: Query): Promise<T[]>;
    Update(entity: T): Promise<void>;
    Add(entity: T): Promise<void>;
    Delete(entity: T): Promise<void>;
}
