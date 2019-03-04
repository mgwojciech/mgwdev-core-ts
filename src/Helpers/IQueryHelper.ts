import { Query } from "../Model/Query";

export interface IQueryHelper{
    BuildQuery(query: Query): string;
}