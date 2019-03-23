import { Query } from "../Model/Query";
import { IQueryHelper } from "../Helpers/IQueryHelper";
import { IEntityRepository } from "./IEntityRepository";
import { IHttpClient } from "../Client/IHttpClient";
export declare class RESTEntityRepository<T extends {
    Id: number | string;
}> implements IEntityRepository<T> {
    protected Endpoint: string;
    protected WebClient: IHttpClient;
    protected QueryHelper: IQueryHelper;
    constructor(Endpoint: string, WebClient?: IHttpClient, QueryHelper?: IQueryHelper);
    GetById(Id: string | number): Promise<T>;
    Get(query: Query): Promise<T[]>;
    Update(entity: T): Promise<void>;
    Add(entity: T): Promise<void>;
    Delete(entity: T): Promise<void>;
}
