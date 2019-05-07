import { IDataProvider } from "./IDataProvider";
export interface IEntityRepository<T extends {
    Id: number | string;
}> extends IDataProvider<T> {
    GetById(Id: number | string): Promise<T>;
    Update(entity: T): Promise<void>;
    Add(entity: T): Promise<void>;
    Delete(entity: T): Promise<void>;
}
