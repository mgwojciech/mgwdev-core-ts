import { User } from "../../Model/User";
import { IDataProvider } from "../../Repository/IDataProvider";
import { IHttpClient } from "../../Client/IHttpClient";
import { SearchClient } from "../Search/SearchClient";
import { SearchDrivenDataProvider } from "../../Repository/SearchDrivenDataProvider";
import { UserSearchResultMapper } from "../Search/UserSearchResultMapper";
import { UserSearchQueryBuilder } from "../Search/SearchQueryBuilder";

export class PeoplePickerHelper {
    constructor(protected UsersRepository: IDataProvider<User>, public SelectedPeople: User[] = []){
    }

    public QueryPeopleSource(queryText: string): Promise<User[]>{
        return this.UsersRepository.Get({
            Query: queryText
        })
    }
}

export interface IPeoplePickerHelperFactory{
    GetPeoplePickerHelper(SelectedPeople: User[]) : PeoplePickerHelper;
}

export class SearchDrivenPeoplePickerHelperFactory implements IPeoplePickerHelperFactory{
    constructor(protected HttpClient: IHttpClient){

    }
    public GetPeoplePickerHelper(SelectedPeople: User[] = []) : PeoplePickerHelper{
        let dataProvider = new SearchDrivenDataProvider<User>(new UserSearchResultMapper(),new SearchClient(this.HttpClient),new UserSearchQueryBuilder());

        return new PeoplePickerHelper(dataProvider, SelectedPeople);
    }
}