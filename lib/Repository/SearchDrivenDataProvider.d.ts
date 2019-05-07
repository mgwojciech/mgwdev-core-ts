import { IDataProvider } from "./IDataProvider";
import { Query } from "../Model/Query";
import { SearchClient } from "../Helpers/Search/SearchClient";
import { ISearchResultsMapper } from "../Helpers/Search/ISearchResultsMapper";
import { SearchQueryBuilder } from "../Helpers/Search/SearchQueryBuilder";
export declare class SearchDrivenDataProvider<T> implements IDataProvider<T> {
    protected ResultMapper: ISearchResultsMapper<T>;
    protected SearchClient: SearchClient;
    protected QueryBuilder: SearchQueryBuilder;
    constructor(ResultMapper: ISearchResultsMapper<T>, SearchClient: SearchClient, QueryBuilder: SearchQueryBuilder);
    Get(query: Query): Promise<T[]>;
}
