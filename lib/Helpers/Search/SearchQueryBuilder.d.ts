export declare abstract class SearchQueryBuilder {
    BuildQuery(queryText: string, skip?: number): string;
    protected abstract BuildScopePart(): string;
    protected abstract BuildSkipAndTop(skip: number): string;
    protected abstract BuildSelect(): string;
}
export declare class SimpleSearchQueryBuilder extends SearchQueryBuilder {
    BuildQuery(queryText: string, skip?: number): string;
    protected BuildScopePart(): string;
    protected BuildSkipAndTop(skip: number): string;
    protected BuildSelect(): string;
}
export declare class AdvancedSearchQueryBuilder extends SearchQueryBuilder {
    private ScopeId;
    private Top;
    private Fields;
    constructor(ScopeId?: string, Top?: number, Fields?: string[]);
    protected BuildScopePart(): string;
    protected BuildSkipAndTop(skip?: number): string;
    protected BuildSelect(): string;
}
export declare class UserSearchQueryBuilder extends AdvancedSearchQueryBuilder {
    constructor();
}
