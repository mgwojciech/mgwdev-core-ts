import { IDataProvider } from "./IDataProvider";
import { Query } from "../Model/Query";
import { SearchClient } from "../Helpers/Search/SearchClient";
import { ISearchResultsMapper } from "../Helpers/Search/ISearchResultsMapper";
import { SearchQueryBuilder } from "../Helpers/Search/SearchQueryBuilder";

export class SearchDrivenDataProvider<T> implements IDataProvider<T>{
    constructor(protected ResultMapper: ISearchResultsMapper<T>,
        protected SearchClient: SearchClient, 
        protected QueryBuilder: SearchQueryBuilder){

    }
    Get(query: Query): Promise<T[]> {
        let self = this;
        let searchQuery = this.QueryBuilder.BuildQuery(query.Query || "", query.Skip);
        return self.SearchClient.QuerySearch(searchQuery).then((results)=>{
            return self.ResultMapper.MapToEntity(results);
        });
    }

}