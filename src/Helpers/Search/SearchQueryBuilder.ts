export abstract class SearchQueryBuilder{
    public BuildQuery(queryText: string, skip: number = 0): string {
        return `?querytext='${queryText}'${this.BuildScopePart()}${this.BuildSkipAndTop(skip)}${this.BuildSelect()}`;
    }    
    protected abstract BuildScopePart(): string;
    protected abstract BuildSkipAndTop(skip:number): string;
    protected abstract BuildSelect(): string;
}


export class SimpleSearchQueryBuilder extends SearchQueryBuilder{
    public BuildQuery(queryText: string, skip: number = 0): string {
        return queryText;
    }    
    protected BuildScopePart(): string {
        return "";
    }    
    protected BuildSkipAndTop(skip: number): string {
        return "";
    }
    protected BuildSelect(): string {
        return "";
    }


}
export class AdvancedSearchQueryBuilder extends SearchQueryBuilder{
    constructor(private ScopeId?: string, private Top: number = 10, private Fields?: string[]){
        super();
    }
    protected BuildScopePart(): string {
        if(this.ScopeId)
            return `&sourceid='${this.ScopeId}'`
        return "";
    }
    protected BuildSkipAndTop(skip: number = 0): string {
        return `&startrow=${skip}&rowlimit=${this.Top}`
    }
    protected BuildSelect(): string {
        if(this.Fields)
            return `&selectProperties='${this.Fields.join(',')}'`
        return "";
    }
}
export class UserSearchQueryBuilder extends AdvancedSearchQueryBuilder{
    constructor(){
        super("b09a7990-05ea-4af9-81ef-edfab16c4e31",10, ['PreferredName','AccountName','Department','JobTitle','PictureURL','UserProfile_GUID','WorkEmail'])
    }
}