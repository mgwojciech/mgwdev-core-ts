import { IEntityRepository } from "./IEntityRepository";
import { Query } from "./../Model/Query";
export declare class BasicEntityRepository<T extends {
    Id: number | string;
}> implements IEntityRepository<T> {
    BaseData: T[];
    constructor(BaseData?: T[]);
    GetById(Id: string | number): Promise<T>;
    Get(query: Query): Promise<T[]>;
    Update(entity: T): Promise<void>;
    Add(entity: T): Promise<void>;
    Delete(entity: T): Promise<void>;
}
