export class RESTQueryHelper {
    constructor() {
        this.firstParameterAdded = false;
    }
    BuildQuery(query) {
        let resultQuery = "";
        if (query.Top)
            resultQuery += this.HandleSeparator(this.firstParameterAdded) + "$top=" + query.Top;
        if (query.Skip)
            resultQuery += this.HandleSeparator(this.firstParameterAdded) + "$skip=" + query.Skip;
        if (query.OrderBy)
            resultQuery += this.HandleSeparator(this.firstParameterAdded) + "$orderBy=" + query.OrderBy;
        if (query.Query)
            resultQuery += this.HandleSeparator(this.firstParameterAdded) + "$filter=" + query.Query;
        this.firstParameterAdded = false;
        return resultQuery;
    }
    HandleSeparator(firstParameterAdded) {
        if (firstParameterAdded)
            return "&";
        this.firstParameterAdded = true;
        return "?";
    }
}
