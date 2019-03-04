//Uses one of two provided repositories based on provided condition
export class ComposedEntityRepository {
    constructor(PrimaryRepo, SecondaryRepo, SecondaryCondition) {
        this.PrimaryRepo = PrimaryRepo;
        this.SecondaryRepo = SecondaryRepo;
        this.SecondaryCondition = SecondaryCondition;
    }
    GetById(Id) {
        if (this.SecondaryCondition())
            return this.SecondaryRepo.GetById(Id);
        else
            return this.PrimaryRepo.GetById(Id);
    }
    Get(query) {
        if (this.SecondaryCondition())
            return this.SecondaryRepo.Get(query);
        else
            return this.PrimaryRepo.Get(query);
    }
    Update(entity) {
        if (this.SecondaryCondition())
            return this.SecondaryRepo.Update(entity);
        else
            return this.PrimaryRepo.Update(entity);
    }
    Add(entity) {
        if (this.SecondaryCondition())
            return this.SecondaryRepo.Add(entity);
        else
            return this.PrimaryRepo.Add(entity);
    }
    Delete(entity) {
        if (this.SecondaryCondition())
            return this.SecondaryRepo.Delete(entity);
        else
            return this.PrimaryRepo.Delete(entity);
    }
}
