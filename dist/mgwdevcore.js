(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.MGWDev || (g.MGWDev = {})).Core = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpClient {
    Request(url, method, options) {
        let self = this;
        return new Promise((resolve, error) => {
            var oReq = new XMLHttpRequest();
            oReq.onreadystatechange = function (ev) {
                if (self.IsRequestValid(oReq)) {
                    if (options && options.responseParser)
                        resolve(options.responseParser(oReq.responseText));
                    else
                        resolve(JSON.parse(oReq.responseText));
                }
                else if (oReq.status >= 400)
                    error(oReq);
            };
            oReq.open(method, url, true);
            oReq.setRequestHeader("accept", "application/json");
            if (options && options.requestData)
                oReq.send(JSON.stringify(options.requestData));
            else
                oReq.send();
        });
    }
    IsRequestValid(oReq) {
        if (oReq.readyState == 4) {
            if (oReq.status == 200)
                return true;
            else
                return false;
        }
        return false;
    }
}
exports.HttpClient = HttpClient;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockHttpClient {
    constructor(RequestResponseCollection) {
        this.RequestResponseCollection = RequestResponseCollection;
        this.Calls = [];
    }
    Request(url, method, options) {
        let self = this;
        return new Promise((resolve, error) => {
            let response = self.RequestResponseCollection.find((response) => {
                return response.url == url && method == response.method;
            });
            self.Calls.push({
                url: url,
                method: method,
                response: response ? response.response : null
            });
            if (response) {
                if (options && options.responseParser)
                    resolve(options.responseParser(response.response));
                else
                    resolve(response.response);
            }
            error("Request not found");
        });
    }
}
exports.MockHttpClient = MockHttpClient;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelHelper {
}
exports.ModelHelper = ModelHelper;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RESTQueryHelper {
    constructor() {
        this.firstParameterAdded = false;
    }
    BuildQuery(query) {
        let resultQuery = "";
        if (query.Top)
            resultQuery += this.HandleSeparator(this.firstParameterAdded) + "$top=" + query.Top;
        if (query.Skip)
            resultQuery += this.HandleSeparator(this.firstParameterAdded) + "$skip=" + query.Skip;
        if (query.OrderBy)
            resultQuery += this.HandleSeparator(this.firstParameterAdded) + "$orderBy=" + query.OrderBy;
        if (query.Query)
            resultQuery += this.HandleSeparator(this.firstParameterAdded) + "$filter=" + query.Query;
        this.firstParameterAdded = false;
        return resultQuery;
    }
    HandleSeparator(firstParameterAdded) {
        if (firstParameterAdded)
            return "&";
        this.firstParameterAdded = true;
        return "?";
    }
}
exports.RESTQueryHelper = RESTQueryHelper;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
}
exports.Query = Query;

},{}],6:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BasicEntityRepository {
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
exports.BasicEntityRepository = BasicEntityRepository;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ComposedEntityRepository {
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
exports.ComposedEntityRepository = ComposedEntityRepository;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./../Client/HttpClient");
const RESTQueryHelper_1 = require("../Helpers/RESTQueryHelper");
class RESTEntityRepository {
    constructor(Endpoint, WebClient = new HttpClient_1.HttpClient(), QueryHelper = new RESTQueryHelper_1.RESTQueryHelper()) {
        this.Endpoint = Endpoint;
        this.WebClient = WebClient;
        this.QueryHelper = QueryHelper;
    }
    GetById(Id) {
        return this.WebClient.Request(`${this.Endpoint}(${Id})`, "GET");
    }
    Get(query) {
        let restQuery = this.QueryHelper.BuildQuery(query);
        return this.WebClient.Request(this.Endpoint + restQuery, "GET", {
            responseParser: (result) => {
                return JSON.parse(result).value;
            }
        });
    }
    Update(entity) {
        return this.WebClient.Request(`${this.Endpoint}(${entity.Id})`, "PATCH", {
            requestData: entity
        });
    }
    Add(entity) {
        return this.WebClient.Request(this.Endpoint, "POST", {
            requestData: entity
        });
    }
    Delete(entity) {
        return this.WebClient.Request(`${this.Endpoint}(${entity.Id})`, "DELETE");
    }
}
exports.RESTEntityRepository = RESTEntityRepository;

},{"../Helpers/RESTQueryHelper":4,"./../Client/HttpClient":1}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEntityRepository_1 = require("./BasicEntityRepository");
class SessionStorageRepository extends BasicEntityRepository_1.BasicEntityRepository {
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
exports.SessionStorageRepository = SessionStorageRepository;

},{"./BasicEntityRepository":6}],10:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./Client/HttpClient"));
__export(require("./Client/MockHttpClient"));
__export(require("./Helpers/ModelHelper"));
__export(require("./Helpers/RESTQueryHelper"));
__export(require("./Model/Query"));
__export(require("./Repository/RESTEntityRepository"));
__export(require("./Repository/BasicEntityRepository"));
__export(require("./Repository/SessionStorageRepository"));
__export(require("./Repository/ComposedEntityRepository"));

},{"./Client/HttpClient":1,"./Client/MockHttpClient":2,"./Helpers/ModelHelper":3,"./Helpers/RESTQueryHelper":4,"./Model/Query":5,"./Repository/BasicEntityRepository":6,"./Repository/ComposedEntityRepository":7,"./Repository/RESTEntityRepository":8,"./Repository/SessionStorageRepository":9}]},{},[10])(10)
});
