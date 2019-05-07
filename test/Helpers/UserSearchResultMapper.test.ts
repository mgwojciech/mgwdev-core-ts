import { expect, assert } from 'chai';
import { UserSearchResultMapper } from '../../src/Helpers/Search/UserSearchResultMapper';
import { UserSearchResponse } from '../MockData/UserSearchResponse';
/// <reference types="mocha" />

describe('UserSearchResultMapper', () => {
    it("should map users", () => {
        let mapper = new UserSearchResultMapper();

        let results = mapper.MapToEntity(UserSearchResponse.Response);
        
        assert.equal(results[0].PreferredName, "Test 1");
    })
});