import { IHttpClient } from "../../Client/IHttpClient";
import { SearchResult } from "../../Model/SP/SearchResult";
import { SearchQueryBuilder, AdvancedSearchQueryBuilder } from "./SearchQueryBuilder";

export class SearchClient{
    constructor(protected HttpClient: IHttpClient, protected QueryBuilder: SearchQueryBuilder = new AdvancedSearchQueryBuilder()){

    }

    public QuerySearch(queryText: string, skip: number = 0):Promise<SearchResult>{
        let query = this.QueryBuilder.BuildQuery(queryText, skip);
        return this.HttpClient.Request(`/_api/search/query${query}`,"GET");
    }
}

export class BasicSearchClient extends SearchClient{
    public QuerySearch(queryText: string, skip: number = 0):Promise<SearchResult>{
        return this.HttpClient.Request(`/_api/search/query?querytext='${queryText}'`,"GET");
    }
}