export class SearchClient {
    constructor(HttpClient) {
        this.HttpClient = HttpClient;
    }
    QuerySearch(queryText) {
        return this.HttpClient.Request(`/_api/search/query${queryText}`, "GET");
    }
}
export class BasicSearchClient extends SearchClient {
    QuerySearch(queryText) {
        return this.HttpClient.Request(`/_api/search/query?querytext='${queryText}'`, "GET");
    }
}
