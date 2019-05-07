import { SearchDrivenDataProvider } from "../../src/Repository/SearchDrivenDataProvider";
import { User } from "../../src/Model/User";
import { UserSearchResultMapper } from "../../src/Helpers/Search/UserSearchResultMapper";
import { SearchClient, UserSearchQueryBuilder, MockHttpClient, BasicSearchClient, SimpleSearchQueryBuilder } from "../../src";
import { UserSearchResponse } from '../MockData/UserSearchResponse';
import {expect, assert} from 'chai';
/// <reference types="mocha" />

describe('SearchDrivenDataProvider', () => {
    it("should get with query builder", (done) => {
        let httpClient = new MockHttpClient([{
            url: "/_api/search/query?querytext='Test'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&startrow=0&rowlimit=10&selectProperties='PreferredName,AccountName,Department,JobTitle,PictureURL,UserProfile_GUID,WorkEmail'",
            method: "GET",
            response: UserSearchResponse.Response
        }])
        let entityRepository = new SearchDrivenDataProvider<User>(new UserSearchResultMapper(),new SearchClient(httpClient), new UserSearchQueryBuilder());

        entityRepository.Get({Query: "Test"}).then((results) => {
            assert.equal(results[0].PreferredName, "Test 1")
        }).then(done);
    })
    it("should get with basic search client", (done) => {
        let httpClient = new MockHttpClient([{
            url: "/_api/search/query?querytext='Test'",
            method: "GET",
            response: UserSearchResponse.Response
        }])
        let entityRepository = new SearchDrivenDataProvider<User>(new UserSearchResultMapper(),new BasicSearchClient(httpClient), new SimpleSearchQueryBuilder());

        entityRepository.Get({Query: "Test"}).then((results) => {
            assert.equal(results[0].PreferredName, "Test 1")
        }).then(done);
    })
});