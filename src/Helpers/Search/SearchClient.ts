import { IHttpClient } from "../../Client/IHttpClient";
import { SearchResult } from "../../Model/SP/SearchResult";

export class SearchClient{
    constructor(protected HttpClient: IHttpClient){

    }

    public QuerySearch(queryText: string):Promise<SearchResult>{
        return this.HttpClient.Request(`/_api/search/query${queryText}`,"GET");
    }
}

export class BasicSearchClient extends SearchClient{
    public QuerySearch(queryText: string):Promise<SearchResult>{
        return this.HttpClient.Request(`/_api/search/query?querytext='${queryText}'`,"GET");
    }
}