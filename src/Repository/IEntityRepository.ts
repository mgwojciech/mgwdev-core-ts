import { Query } from "../Model/Query";

export interface IEntityRepository<T extends { Id: number | string }> {
    GetById(Id: number | string): Promise<T>;
    Get(query: Query): Promise<T[]>;
    Update(entity: T): Promise<void>;
    Add(entity: T): Promise<void>;
    Delete(entity: T): Promise<void>;
}