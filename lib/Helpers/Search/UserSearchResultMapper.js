import { ArrayHelper } from "../ArrayHelpers";
export class UserSearchResultMapper {
    MapToEntity(searchResults) {
        if (searchResults &&
            searchResults.PrimaryQueryResult &&
            searchResults.PrimaryQueryResult.RelevantResults &&
            searchResults.PrimaryQueryResult.RelevantResults.Table &&
            searchResults.PrimaryQueryResult.RelevantResults.Table.Rows) {
            return searchResults.PrimaryQueryResult.RelevantResults.Table.Rows.map((row) => {
                return {
                    Id: ArrayHelper.FindValueByKey(row.Cells, "Id"),
                    AccountName: ArrayHelper.FindValueByKey(row.Cells, "AccountName"),
                    Department: ArrayHelper.FindValueByKey(row.Cells, "Department"),
                    JobTitle: ArrayHelper.FindValueByKey(row.Cells, "JobTitle"),
                    PictureURL: ArrayHelper.FindValueByKey(row.Cells, "PictureURL"),
                    PreferredName: ArrayHelper.FindValueByKey(row.Cells, "PreferredName"),
                    UserProfile_GUID: ArrayHelper.FindValueByKey(row.Cells, "UserProfile_GUID"),
                    WorkEmail: ArrayHelper.FindValueByKey(row.Cells, "WorkEmail"),
                };
            });
        }
        return [];
    }
}
