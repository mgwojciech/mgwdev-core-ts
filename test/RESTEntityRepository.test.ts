
import { expect, assert } from 'chai';
import { RESTQueryHelper } from '../src/Helpers/RESTQueryHelper';
import { RESTEntityRepository } from '../src/Repository/RESTEntityRepository';
import { MockHttpClient } from '../src';
/// <reference types="mocha" />

describe('RESTEntityRepository', () => {
    it("should get by id", (done) => {
        let entityRepository = new RESTEntityRepository<{ Id: number, Title: string }>("/_api/Entity", new MockHttpClient([{
            url: "/_api/Entity(1)",
            method: "GET",
            response: {
                Id: 1,
                Title: "Test"
            }
        }]))

        entityRepository.GetById(1).then((result) => {
            assert.equal(result.Title, "Test")
        }).then(done);
    })
    it("should get by query", (done) => {
        let entityRepository = new RESTEntityRepository<{ Id: number, Title: string }>("/_api/Entity", new MockHttpClient([{
            url: "/_api/Entity?$top=2",
            method: "GET",
            response: [{
                Id: 1,
                Title: "Test 1"
            }, {
                Id: 2,
                Title: "Test 2"
            }]
        }]))

        entityRepository.Get({
            Top: 2
        }).then((result) => {
            assert.equal(result.length, 2);
        }).then(done);
    })
    it("should add", (done) => {
        let httpClient = new MockHttpClient([{
            url: "/_api/Entity",
            method: "POST",
            response: "OK"
        }])
        let entityRepository = new RESTEntityRepository<{ Id: number, Title: string }>("/_api/Entity", httpClient);

        entityRepository.Add({
            Id: 3,
            Title: "Test 3"
        }).then((result)=>{
            assert.equal(httpClient.Calls[0].response.response, "OK");
        }).then(done);
    })
    it("should update", (done) => {
        let httpClient = new MockHttpClient([{
            url: "/_api/Entity(3)",
            method: "PATCH",
            response: "OK"
        }])
        let entityRepository = new RESTEntityRepository<{ Id: number, Title: string }>("/_api/Entity", httpClient);

        entityRepository.Update({
            Id: 3,
            Title: "Test 3"
        }).then((result)=>{
            assert.equal(httpClient.Calls[0].response.response, "OK");
        }).then(done);
    })

    it("should delete", (done) => {
        let httpClient = new MockHttpClient([{
            url: "/_api/Entity(3)",
            method: "DELETE",
            response: "OK"
        }])
        let entityRepository = new RESTEntityRepository<{ Id: number, Title: string }>("/_api/Entity", httpClient);

        entityRepository.Delete({
            Id: 3,
            Title: "Test 3"
        }).then((result)=>{
            assert.equal(httpClient.Calls[0].response.response, "OK");
        }).then(done);
    })
});