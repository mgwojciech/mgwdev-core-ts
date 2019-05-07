import { User } from "../../Model/User";
import { IDataProvider } from "../../Repository/IDataProvider";
import { IHttpClient } from "../../Client/IHttpClient";
export declare class PeoplePickerHelper {
    protected UsersRepository: IDataProvider<User>;
    SelectedPeople: User[];
    constructor(UsersRepository: IDataProvider<User>, SelectedPeople?: User[]);
    QueryPeopleSource(queryText: string): Promise<User[]>;
}
export interface IPeoplePickerHelperFactory {
    GetPeoplePickerHelper(SelectedPeople: User[]): PeoplePickerHelper;
}
export declare class SearchDrivenPeoplePickerHelperFactory implements IPeoplePickerHelperFactory {
    protected HttpClient: IHttpClient;
    constructor(HttpClient: IHttpClient);
    GetPeoplePickerHelper(SelectedPeople?: User[]): PeoplePickerHelper;
}
