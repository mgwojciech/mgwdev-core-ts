import { IHttpClient } from "../../Client/IHttpClient";
import { SearchResult } from "../../Model/SP/SearchResult";
export declare class SearchClient {
    protected HttpClient: IHttpClient;
    constructor(HttpClient: IHttpClient);
    QuerySearch(queryText: string): Promise<SearchResult>;
}
export declare class BasicSearchClient extends SearchClient {
    QuerySearch(queryText: string): Promise<SearchResult>;
}
