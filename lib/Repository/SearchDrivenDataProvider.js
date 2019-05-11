export class SearchDrivenDataProvider {
    constructor(ResultMapper, SearchClient) {
        this.ResultMapper = ResultMapper;
        this.SearchClient = SearchClient;
    }
    Get(query) {
        let self = this;
        return self.SearchClient.QuerySearch(query.Query || "", query.Skip).then((results) => {
            return self.ResultMapper.MapToEntity(results);
        });
    }
}
