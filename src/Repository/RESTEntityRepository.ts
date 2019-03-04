import { HttpClient } from "./../Client/HttpClient";
import { Query } from "../Model/Query";
import { IQueryHelper } from "../Helpers/IQueryHelper";
import { RESTQueryHelper } from "../Helpers/RESTQueryHelper";
import { IEntityRepository } from "./IEntityRepository";
import { IHttpClient } from "../Client/IHttpClient";

export class RESTEntityRepository<T extends { Id: number | string }> implements IEntityRepository<T>{
    constructor(protected Endpoint:string,
        protected WebClient: IHttpClient = new HttpClient(), 
        protected QueryHelper: IQueryHelper = new RESTQueryHelper()){

    }
    GetById(Id: string | number): Promise<T> {
        return this.WebClient.Request(`${this.Endpoint}(${Id})`,"GET");
    }    
    Get(query: Query): Promise<T[]> {
        let restQuery = this.QueryHelper.BuildQuery(query);
        return this.WebClient.Request(this.Endpoint+restQuery, "GET");
    }
    Update(entity: T): Promise<boolean> {
        return this.WebClient.Request(`${this.Endpoint}(${entity.Id})`, "PATCH",{
            requestData: entity
        });
    }
    Add(entity: T): Promise<boolean> {
        return this.WebClient.Request(this.Endpoint, "POST",{
            requestData: entity
        });
    }
    Delete(entity: T): Promise<boolean> {
        return this.WebClient.Request(`${this.Endpoint}(${entity.Id})`, "DELETE");
    }

    
}