
import { expect, assert } from 'chai';
import { BasicEntityRepository } from '../src/Repository/BasicEntityRepository';
/// <reference types="mocha" />

describe('BasicEntityRepository', () => {
    it("should get by id", (done) => {
        let entityRepository = new BasicEntityRepository<{ Id: number, Title: string }>([{
            Id: 1,
            Title: "Test"
        }])

        entityRepository.GetById(1).then((result) => {
            assert.equal(result.Title, "Test")
        }).then(done);
    })
    it("should get all", (done) => {
        let entityRepository = new BasicEntityRepository<{ Id: number, Title: string }>([{
            Id: 1,
            Title: "Test"
        },{
            Id: 2,
            Title: "Test"
        }])

        entityRepository.Get({
            Top: 2
        }).then((result) => {
            assert.equal(result.length, 2);
        }).then(done);
    })
    it("should add", (done) => {
        let entityRepository = new BasicEntityRepository<{ Id: number, Title: string }>();

        entityRepository.Add({
            Id: 3,
            Title: "Test 3"
        }).then((result)=>{
            assert.equal(entityRepository.BaseData.length, 1);
        }).then(done);
    })
    it("should update", (done) => {
        let entityRepository = new BasicEntityRepository<{ Id: number, Title: string }>([{
            Id: 1,
            Title: "Test"
        },{
            Id: 2,
            Title: "Test"
        }])

        entityRepository.Update({
            Id: 1,
            Title: "Test 1"
        }).then((result)=>{
            assert.equal(entityRepository.BaseData[0].Title, "Test 1");
        }).then(done);
    })

    it("should delete", (done) => {
        let entityRepository = new BasicEntityRepository<{ Id: number, Title: string }>([{
            Id: 1,
            Title: "Test"
        },{
            Id: 2,
            Title: "Test"
        }])

        entityRepository.Delete({
            Id: 2,
            Title: "Test 3"
        }).then((result)=>{
            assert.equal(entityRepository.BaseData.length, 1);
        }).then(done);
    })
});