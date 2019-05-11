import { AdvancedSearchQueryBuilder } from "./SearchQueryBuilder";
export class SearchClient {
    constructor(HttpClient, QueryBuilder = new AdvancedSearchQueryBuilder()) {
        this.HttpClient = HttpClient;
        this.QueryBuilder = QueryBuilder;
    }
    QuerySearch(queryText, skip = 0) {
        let query = this.QueryBuilder.BuildQuery(queryText, skip);
        return this.HttpClient.Request(`/_api/search/query${query}`, "GET");
    }
}
export class BasicSearchClient extends SearchClient {
    QuerySearch(queryText, skip = 0) {
        return this.HttpClient.Request(`/_api/search/query?querytext='${queryText}'`, "GET");
    }
}
