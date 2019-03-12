import { IEntityRepository } from "./IEntityRepository";
import { Query } from "./../Model/Query";

export class BasicEntityRepository<T extends { Id: number | string }> implements IEntityRepository<T>{
    constructor(public BaseData: T[] = []) {

    }
    GetById(Id: string | number): Promise<T> {
        let self = this;
        return new Promise<T>((resolve, error) => {
            try {
                let result = self.BaseData.find((entity) => {
                    return entity.Id == Id;
                });
                resolve(result);
            }
            catch (err) {
                error(err);
            }
        });
    }
    Get(query: Query): Promise<T[]> {
        let self = this;
        return new Promise<T[]>((resolve, error) => {
            try {
                resolve(self.BaseData);
            }
            catch (err) {
                error(err);
            }
        });
    }
    async Update(entity: T): Promise<void> {
        let self = this;
        let entityInRepo = await self.GetById(entity.Id);
        return new Promise<void>((resolve, error) => {
            try {
                let entityIndex = self.BaseData.indexOf(entityInRepo);
                self.BaseData[entityIndex] = entity;
                resolve();
            }
            catch (err) {
                error(err);
            }
        });
    }
    Add(entity: T): Promise<void> {
        let self = this;
        return new Promise<void>((resolve, error) => {
            try {
                self.BaseData.push(entity);
                resolve();
            }
            catch (err) {
                error(err);
            }
        });
    }
    async Delete(entity: T): Promise<void> {
        let self = this;
        let entityInRepo = await self.GetById(entity.Id);
        return new Promise<void>((resolve, error) => {
            try {
                let entityIndex = self.BaseData.indexOf(entityInRepo);
                self.BaseData.splice(entityIndex, 1);
                resolve();
            }
            catch (err) {
                error(err);
            }
        });
    }


}