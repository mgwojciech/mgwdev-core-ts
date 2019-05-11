import { SearchClient } from "../Search/SearchClient";
import { SearchDrivenDataProvider } from "../../Repository/SearchDrivenDataProvider";
import { UserSearchResultMapper } from "../Search/UserSearchResultMapper";
import { UserSearchQueryBuilder } from "../Search/SearchQueryBuilder";
export class PeoplePickerHelper {
    constructor(UsersRepository, SelectedPeople = []) {
        this.UsersRepository = UsersRepository;
        this.SelectedPeople = SelectedPeople;
    }
    QueryPeopleSource(queryText) {
        return this.UsersRepository.Get({
            Query: queryText
        });
    }
}
export class SearchDrivenPeoplePickerHelperFactory {
    constructor(HttpClient) {
        this.HttpClient = HttpClient;
    }
    GetPeoplePickerHelper(SelectedPeople = []) {
        let dataProvider = new SearchDrivenDataProvider(new UserSearchResultMapper(), new SearchClient(this.HttpClient, new UserSearchQueryBuilder()));
        return new PeoplePickerHelper(dataProvider, SelectedPeople);
    }
}
