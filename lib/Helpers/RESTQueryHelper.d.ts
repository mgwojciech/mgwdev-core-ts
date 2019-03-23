import { IQueryHelper } from "./IQueryHelper";
import { Query } from "../Model/Query";
export declare class RESTQueryHelper implements IQueryHelper {
    private firstParameterAdded;
    BuildQuery(query: Query): string;
    HandleSeparator(firstParameterAdded: boolean): any;
}
