import { IEntityRepository } from "./IEntityRepository";
import { Query } from "../Model/Query";
//Uses one of two provided repositories based on provided condition
export class ComposedEntityRepository<T extends { Id: number | string }> implements IEntityRepository<T>{

    constructor(protected PrimaryRepo:IEntityRepository<T>, 
        protected SecondaryRepo:IEntityRepository<T>, 
        protected SecondaryCondition:()=>boolean){

    }
    public GetById(Id: string | number): Promise<T> {
        if(this.SecondaryCondition())
            return this.SecondaryRepo.GetById(Id);
        else
            return this.PrimaryRepo.GetById(Id);
    }   
    Get(query: Query): Promise<T[]> {
        if(this.SecondaryCondition())
            return this.SecondaryRepo.Get(query);
        else
            return this.PrimaryRepo.Get(query);
    }
    public Update(entity: T): Promise<boolean> {
        if(this.SecondaryCondition())
            return this.SecondaryRepo.Update(entity);
        else
            return this.PrimaryRepo.Update(entity);
    }
    public Add(entity: T): Promise<boolean> {
        if(this.SecondaryCondition())
            return this.SecondaryRepo.Add(entity);
        else
            return this.PrimaryRepo.Add(entity);
    }
    public Delete(entity: T): Promise<boolean> {
        if(this.SecondaryCondition())
            return this.SecondaryRepo.Delete(entity);
        else
            return this.PrimaryRepo.Delete(entity);
    }

    
}