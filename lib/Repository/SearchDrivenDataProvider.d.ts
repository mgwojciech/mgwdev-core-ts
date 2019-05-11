import { IDataProvider } from "./IDataProvider";
import { Query } from "../Model/Query";
import { SearchClient } from "../Helpers/Search/SearchClient";
import { ISearchResultsMapper } from "../Helpers/Search/ISearchResultsMapper";
export declare class SearchDrivenDataProvider<T> implements IDataProvider<T> {
    protected ResultMapper: ISearchResultsMapper<T>;
    protected SearchClient: SearchClient;
    constructor(ResultMapper: ISearchResultsMapper<T>, SearchClient: SearchClient);
    Get(query: Query): Promise<T[]>;
}
