import { IDataProvider } from "./IDataProvider";
import { Query } from "../Model/Query";
import { SearchClient } from "../Helpers/Search/SearchClient";
import { ISearchResultsMapper } from "../Helpers/Search/ISearchResultsMapper";
import { SearchQueryBuilder } from "../Helpers/Search/SearchQueryBuilder";

export class SearchDrivenDataProvider<T> implements IDataProvider<T>{
    constructor(protected ResultMapper: ISearchResultsMapper<T>,
        protected SearchClient: SearchClient){

    }
    Get(query: Query): Promise<T[]> {
        let self = this;
        return self.SearchClient.QuerySearch(query.Query || "", query.Skip).then((results)=>{
            return self.ResultMapper.MapToEntity(results);
        });
    }

}