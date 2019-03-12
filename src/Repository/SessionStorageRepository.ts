import { BasicEntityRepository } from "./BasicEntityRepository";

export class SessionStorageRepository<T extends { Id: number | string }> extends BasicEntityRepository<T>{
    static GetInitialData<T extends { Id: number | string }>(SessionStorageKey: string): T[] {
        let serializedData = sessionStorage.getItem(SessionStorageKey);
        if(serializedData)
            return JSON.parse(serializedData) as T[];
        else 
            return [];
    }
    UpdateSessionStorage(){
        let serializedData = JSON.stringify(this.BaseData);
        sessionStorage.setItem(this.SessionStorageKey, serializedData);
    }
    constructor(protected SessionStorageKey: string){
        super(SessionStorageRepository.GetInitialData<T>(SessionStorageKey))
    }
    Add(entity: T){
        let self = this;
        return super.Add(entity).then(()=>{
            self.UpdateSessionStorage();
        });
    }
    Update(entity: T){
        let self = this;
        return super.Update(entity).then(()=>{
            self.UpdateSessionStorage();
        });
    }
    Delete(entity: T){
        let self = this;
        return super.Delete(entity).then(()=>{
            self.UpdateSessionStorage();
        });
    }

}