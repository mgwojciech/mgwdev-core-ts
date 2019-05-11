import { IHttpClient } from "../../Client/IHttpClient";
import { SearchResult } from "../../Model/SP/SearchResult";
import { SearchQueryBuilder } from "./SearchQueryBuilder";
export declare class SearchClient {
    protected HttpClient: IHttpClient;
    protected QueryBuilder: SearchQueryBuilder;
    constructor(HttpClient: IHttpClient, QueryBuilder?: SearchQueryBuilder);
    QuerySearch(queryText: string, skip?: number): Promise<SearchResult>;
}
export declare class BasicSearchClient extends SearchClient {
    QuerySearch(queryText: string, skip?: number): Promise<SearchResult>;
}
