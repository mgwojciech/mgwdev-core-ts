import { SearchResult } from './../../Model/SP/SearchResult';
export interface ISearchResultsMapper<T>{
    MapToEntity(searchResults: SearchResult):T[];
}