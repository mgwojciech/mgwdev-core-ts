import { ISearchResultsMapper } from "./ISearchResultsMapper";
import { User } from "../../Model/User";
import { SearchResult } from "../../Model/SP/SearchResult";
export declare class UserSearchResultMapper implements ISearchResultsMapper<User> {
    MapToEntity(searchResults: SearchResult): User[];
}
