export interface SearchResult {
    ElapsedTime?: number;
    PrimaryQueryResult?: QueryResult;
    Properties?: SPProperty[];
    SecondaryQueryResults?: QueryResult[];
    SpellingSuggestion?: string;
    TriggeredRules?: string[];
}
export interface QueryResult {
    CustomResults?: CustomResult[];
    QueryId?: string;
    QueryRuleId?: string;
    RefinementResults?: RefinementResults;
    RelevantResults?: RelevantResults;
    SpecialTermResults?: SpecialTermResults;
}
export interface CustomResult {
    GroupTemplateId?: string;
    ItemTemplateId?: string;
    Properties?: SPProperty[];
    ResultTitle?: string;
    ResultTitleUrl?: string;
    Table?: DataTable;
    TableType?: string;
}
export interface SPProperty {
    Key?: string;
    Value?: string;
    ValueType?: string;
}
export interface DataTable {
    Rows?: DataRow[];
}
export interface DataRow {
    Cells: SPProperty[];
}
export interface RefinementResults {
    GroupTemplateId?: string;
    ItemTemplateId?: string;
    Properties?: SPProperty[];
    Refiners?: Refiner[];
    ResultTitle?: string;
    ResultTitleUrl?: string;
}
export interface Refiner {
    Entries?: RefinerEntry[];
    Name?: string;
}
export interface RefinerEntry {
    RefinementCount?: number;
    RefinementName?: string;
    RefinementToken?: string;
    RefinementValue?: string;
}
export interface RelevantResults {
    GroupTemplateId?: string;
    ItemTemplateId?: string;
    Properties?: SPProperty[];
    ResultTitle?: string;
    ResultTitleUrl?: string;
    RowCount?: number;
    Table?: DataTable;
    TotalRows?: number;
    TotalRowsIncludingDuplicates?: number;
}
export interface SpecialTermResults {
    GroupTemplateId?: string;
    ItemTemplateId?: string;
    Properties?: SPProperty[];
    Results?: SpecialTermResult[];
    ResultTitle?: string;
    ResultTitleUrl?: string;
}
export interface SpecialTermResult {
    Description?: string;
    IsVisualBestBet?: boolean;
    PiSearchResultId?: string;
    RenderTemplateId?: string;
    Title?: string;
    Url?: string;
}
