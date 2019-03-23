import { BasicEntityRepository } from "./BasicEntityRepository";
export declare class SessionStorageRepository<T extends {
    Id: number | string;
}> extends BasicEntityRepository<T> {
    protected SessionStorageKey: string;
    static GetInitialData<T extends {
        Id: number | string;
    }>(SessionStorageKey: string): T[];
    UpdateSessionStorage(): void;
    constructor(SessionStorageKey: string);
    Add(entity: T): Promise<void>;
    Update(entity: T): Promise<void>;
    Delete(entity: T): Promise<void>;
}
