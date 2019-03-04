import { HttpClient } from "./../Client/HttpClient";
import { RESTQueryHelper } from "../Helpers/RESTQueryHelper";
export class RESTEntityRepository {
    constructor(Endpoint, WebClient = new HttpClient(), QueryHelper = new RESTQueryHelper()) {
        this.Endpoint = Endpoint;
        this.WebClient = WebClient;
        this.QueryHelper = QueryHelper;
    }
    GetById(Id) {
        return this.WebClient.Request(`${this.Endpoint}(${Id})`, "GET");
    }
    Get(query) {
        let restQuery = this.QueryHelper.BuildQuery(query);
        return this.WebClient.Request(this.Endpoint + restQuery, "GET");
    }
    Update(entity) {
        return this.WebClient.Request(`${this.Endpoint}(${entity.Id})`, "PATCH", {
            requestData: entity
        });
    }
    Add(entity) {
        return this.WebClient.Request(this.Endpoint, "POST", {
            requestData: entity
        });
    }
    Delete(entity) {
        return this.WebClient.Request(`${this.Endpoint}(${entity.Id})`, "DELETE");
    }
}
