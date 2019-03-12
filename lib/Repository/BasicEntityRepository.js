var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BasicEntityRepository {
    constructor(BaseData = []) {
        this.BaseData = BaseData;
    }
    GetById(Id) {
        let self = this;
        return new Promise((resolve, error) => {
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
    Get(query) {
        let self = this;
        return new Promise((resolve, error) => {
            try {
                resolve(self.BaseData);
            }
            catch (err) {
                error(err);
            }
        });
    }
    Update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            let entityInRepo = yield self.GetById(entity.Id);
            return new Promise((resolve, error) => {
                try {
                    let entityIndex = self.BaseData.indexOf(entityInRepo);
                    self.BaseData[entityIndex] = entity;
                    resolve();
                }
                catch (err) {
                    error(err);
                }
            });
        });
    }
    Add(entity) {
        let self = this;
        return new Promise((resolve, error) => {
            try {
                self.BaseData.push(entity);
                resolve();
            }
            catch (err) {
                error(err);
            }
        });
    }
    Delete(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            let entityInRepo = yield self.GetById(entity.Id);
            return new Promise((resolve, error) => {
                try {
                    let entityIndex = self.BaseData.indexOf(entityInRepo);
                    self.BaseData.splice(entityIndex, 1);
                    resolve();
                }
                catch (err) {
                    error(err);
                }
            });
        });
    }
}
