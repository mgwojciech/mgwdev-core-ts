import { Query } from "../Model/Query";


export interface IDataProvider<T>{
    Get(query: Query): Promise<T[]>;
}