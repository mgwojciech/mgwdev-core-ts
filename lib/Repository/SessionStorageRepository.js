import { BasicEntityRepository } from "./BasicEntityRepository";
export class SessionStorageRepository extends BasicEntityRepository {
    constructor(SessionStorageKey) {
        super(SessionStorageRepository.GetInitialData(SessionStorageKey));
        this.SessionStorageKey = SessionStorageKey;
    }
    static GetInitialData(SessionStorageKey) {
        let serializedData = sessionStorage.getItem(SessionStorageKey);
        if (serializedData)
            return JSON.parse(serializedData);
        else
            return [];
    }
    UpdateSessionStorage() {
        let serializedData = JSON.stringify(this.BaseData);
        sessionStorage.setItem(this.SessionStorageKey, serializedData);
    }
    Add(entity) {
        let self = this;
        return super.Add(entity).then(() => {
            self.UpdateSessionStorage();
        });
    }
    Update(entity) {
        let self = this;
        return super.Update(entity).then(() => {
            self.UpdateSessionStorage();
        });
    }
    Delete(entity) {
        let self = this;
        return super.Delete(entity).then(() => {
            self.UpdateSessionStorage();
        });
    }
}
