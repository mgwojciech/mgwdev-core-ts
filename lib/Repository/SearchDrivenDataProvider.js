export class SearchDrivenDataProvider {
    constructor(ResultMapper, SearchClient, QueryBuilder) {
        this.ResultMapper = ResultMapper;
        this.SearchClient = SearchClient;
        this.QueryBuilder = QueryBuilder;
    }
    Get(query) {
        let self = this;
        let searchQuery = this.QueryBuilder.BuildQuery(query.Query || "", query.Skip);
        return self.SearchClient.QuerySearch(searchQuery).then((results) => {
            return self.ResultMapper.MapToEntity(results);
        });
    }
}
