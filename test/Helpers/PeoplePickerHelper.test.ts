import { expect, assert } from 'chai';
import { MockHttpClient, SearchDrivenPeoplePickerHelperFactory, PeoplePickerHelper, BasicEntityRepository, User } from '../../src';
import { UserSearchResponse } from '../MockData/UserSearchResponse';
/// <reference types="mocha" />

describe('SearchDrivenPeoplePickerHelperFactory', () => {
    it("should query people", (done) => {
        let httpClient = new MockHttpClient([{
            url: "/_api/search/query?querytext='Test'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&startrow=0&rowlimit=10&selectProperties='PreferredName,AccountName,Department,JobTitle,PictureURL,UserProfile_GUID,WorkEmail'",
            method: "GET",
            response: UserSearchResponse.Response
        }])
        let factory = new SearchDrivenPeoplePickerHelperFactory(httpClient);

        let helper = factory.GetPeoplePickerHelper([]);
        helper.QueryPeopleSource("Test").then((results) => {
            assert.equal(results[0].PreferredName, "Test 1")
        }).then(done);
    });
    it("should initialize without users", () => {
        let httpClient = new MockHttpClient([])
        let factory = new SearchDrivenPeoplePickerHelperFactory(httpClient);

        let helper = factory.GetPeoplePickerHelper();
        assert.equal(0, helper.SelectedPeople.length);
    });
    it("should initialize with users", () => {
        let httpClient = new MockHttpClient([])
        let factory = new SearchDrivenPeoplePickerHelperFactory(httpClient);

        let helper = factory.GetPeoplePickerHelper([{
            Id: "test_id",
            AccountName: "Test"
        }]);
        assert.equal(1, helper.SelectedPeople.length);
    });
});
describe('PeoplePickerHelper', () => {
    it("should query people", (done) => {
        
        let helper = new PeoplePickerHelper(new BasicEntityRepository<User>([{
            Id: "test_id",
            AccountName: "Test 1"
        }]))
        helper.QueryPeopleSource("Test").then((results) => {
            assert.equal(results[0].AccountName, "Test 1")
        }).then(done);
    });
    it("should initialize without users", () => {
        let helper = new PeoplePickerHelper(new BasicEntityRepository<User>([{
            Id: "test_id",
            AccountName: "Test 1"
        }]))
        assert.equal(0, helper.SelectedPeople.length);
    });
    it("should initialize with users", () => {
        let helper = new PeoplePickerHelper(new BasicEntityRepository<User>([{
            Id: "test_id",
            AccountName: "Test 1"
        }]),[{
            Id: "test_id",
            AccountName: "Test 1"
        }])
        assert.equal(1, helper.SelectedPeople.length);
    });
});