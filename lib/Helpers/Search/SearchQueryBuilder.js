export class SearchQueryBuilder {
    BuildQuery(queryText, skip = 0) {
        return `?querytext='${queryText}'${this.BuildScopePart()}${this.BuildSkipAndTop(skip)}${this.BuildSelect()}`;
    }
}
export class SimpleSearchQueryBuilder extends SearchQueryBuilder {
    BuildQuery(queryText, skip = 0) {
        return queryText;
    }
    BuildScopePart() {
        return "";
    }
    BuildSkipAndTop(skip) {
        return "";
    }
    BuildSelect() {
        return "";
    }
}
export class AdvancedSearchQueryBuilder extends SearchQueryBuilder {
    constructor(ScopeId, Top = 10, Fields) {
        super();
        this.ScopeId = ScopeId;
        this.Top = Top;
        this.Fields = Fields;
    }
    BuildScopePart() {
        if (this.ScopeId)
            return `&sourceid='${this.ScopeId}'`;
        return "";
    }
    BuildSkipAndTop(skip = 0) {
        return `&startrow=${skip}&rowlimit=${this.Top}`;
    }
    BuildSelect() {
        if (this.Fields)
            return `&selectProperties='${this.Fields.join(',')}'`;
        return "";
    }
}
export class UserSearchQueryBuilder extends AdvancedSearchQueryBuilder {
    constructor() {
        super("b09a7990-05ea-4af9-81ef-edfab16c4e31", 10, ['PreferredName', 'AccountName', 'Department', 'JobTitle', 'PictureURL', 'UserProfile_GUID', 'WorkEmail']);
    }
}
