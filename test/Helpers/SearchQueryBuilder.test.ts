import { expect, assert } from 'chai';
import { AdvancedSearchQueryBuilder, SimpleSearchQueryBuilder } from '../../src/Helpers/Search/SearchQueryBuilder';
/// <reference types="mocha" />

describe('SimpleSearchQueryBuilder', () => {
    it("should build query without scope", () => {
        let queryBuilder = new AdvancedSearchQueryBuilder();

        let query = queryBuilder.BuildQuery("test");
        let expectedQuery = "?querytext='test'&startrow=0&rowlimit=10";
        
        assert.equal(query,expectedQuery);
    })
    it("should build query with scope", () => {
        let queryBuilder = new AdvancedSearchQueryBuilder('b09a7990-05ea-4af9-81ef-edfab16c4e31');

        let query = queryBuilder.BuildQuery("test");
        let expectedQuery = "?querytext='test'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&startrow=0&rowlimit=10";
        
        assert.equal(query,expectedQuery);
    })
    it("should build query with scope and fields", () => {
        let queryBuilder = new AdvancedSearchQueryBuilder('b09a7990-05ea-4af9-81ef-edfab16c4e31',10,["PreferredName", "AccountName"]);

        let query = queryBuilder.BuildQuery("test");
        let expectedQuery = "?querytext='test'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&startrow=0&rowlimit=10&selectProperties='PreferredName,AccountName'";
        
        assert.equal(query,expectedQuery);
    })
});

describe('SimpleSearchQueryBuilder', () => {
    it("should build simple query", () => {
        let queryBuilder = new SimpleSearchQueryBuilder();

        let query = queryBuilder.BuildQuery("test");
        let expectedQuery = "test";
        
        assert.equal(query,expectedQuery);
    })
});