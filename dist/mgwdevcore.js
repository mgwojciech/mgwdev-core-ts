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
                else
                    error(oReq);
            };
            oReq.open(method, url, true);
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

},{}],7:[function(require,module,exports){
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
        return this.WebClient.Request(this.Endpoint + restQuery, "GET");
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

},{"../Helpers/RESTQueryHelper":4,"./../Client/HttpClient":1}],8:[function(require,module,exports){
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
__export(require("./Repository/ComposedEntityRepository"));

},{"./Client/HttpClient":1,"./Client/MockHttpClient":2,"./Helpers/ModelHelper":3,"./Helpers/RESTQueryHelper":4,"./Model/Query":5,"./Repository/ComposedEntityRepository":6,"./Repository/RESTEntityRepository":7}]},{},[8])(8)
});
