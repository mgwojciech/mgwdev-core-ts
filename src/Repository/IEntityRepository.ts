import { Query } from "../Model/Query";

export interface IEntityRepository<T extends { Id: number | string }> {
    GetById(Id: number | string): Promise<T>;
    Get(query: Query): Promise<T[]>;
    Update(entity: T): Promise<boolean>;
    Add(entity: T): Promise<boolean>;
    Delete(entity: T): Promise<boolean>;
}