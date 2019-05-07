(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.MGWDev || (g.MGWDev = {})).Core = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpClient {
    constructor(DefaultHeaders = [{
                key: "accept",
                value: "application/json"
            }]) {
        this.DefaultHeaders = DefaultHeaders;
    }
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
            self.DefaultHeaders.forEach((header) => {
                oReq.setRequestHeader(header.key, header.value);
            });
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
class ArrayHelper {
    static FindValueByKey(array, key) {
        let temp = array.find((item) => {
            return item.Key == key;
        });
        if (temp)
            return temp.Value;
        return "";
    }
}
exports.ArrayHelper = ArrayHelper;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchClient_1 = require("../Search/SearchClient");
const SearchDrivenDataProvider_1 = require("../../Repository/SearchDrivenDataProvider");
const UserSearchResultMapper_1 = require("../Search/UserSearchResultMapper");
const SearchQueryBuilder_1 = require("../Search/SearchQueryBuilder");
class PeoplePickerHelper {
    constructor(SelectedPeople, UsersRepository) {
        this.SelectedPeople = SelectedPeople;
        this.UsersRepository = UsersRepository;
    }
    QueryPeopleSource(queryText) {
        return this.UsersRepository.Get({
            Query: queryText
        });
    }
}
exports.PeoplePickerHelper = PeoplePickerHelper;
class SearchDrivenPeoplePickerHelperFactory {
    constructor(HttpClient) {
        this.HttpClient = HttpClient;
    }
    GetPeoplePickerHelper(SelectedPeople) {
        let dataProvider = new SearchDrivenDataProvider_1.SearchDrivenDataProvider(new UserSearchResultMapper_1.UserSearchResultMapper(), new SearchClient_1.SearchClient(this.HttpClient), new SearchQueryBuilder_1.UserSearchQueryBuilder());
        return new PeoplePickerHelper(SelectedPeople, dataProvider);
    }
}
exports.SearchDrivenPeoplePickerHelperFactory = SearchDrivenPeoplePickerHelperFactory;

},{"../../Repository/SearchDrivenDataProvider":17,"../Search/SearchClient":10,"../Search/SearchQueryBuilder":11,"../Search/UserSearchResultMapper":12}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogger {
    LogMessage(message) {
        console.log(message);
    }
    LogError(errorMessage, data) {
        console.error(errorMessage, data);
    }
}
exports.ConsoleLogger = ConsoleLogger;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HTMLLogger {
    constructor(rootElementId, Options = {
            ButtonClass: "logger-button",
            MessageClass: "logger-message",
            ContainerClass: "logger-container"
        }) {
        this.Options = Options;
        this.RootElement = document.getElementById(rootElementId) || document.body;
        this.InitContainer();
    }
    LogMessage(message) {
        this.RenderMessage(message);
    }
    LogError(errorMessage, data) {
        this.RenderMessage(`<span style="color:red;">${errorMessage}</span>`);
    }
    RenderMessage(htmlMessage) {
        let messageContainer = document.getElementById("logger-container-message");
        if (messageContainer) {
            messageContainer.innerHTML = htmlMessage;
        }
        let loggerContainer = document.getElementById("logger-container");
        if (loggerContainer)
            loggerContainer.style.display = "block";
    }
    InitContainer() {
        let self = this;
        let messageContainer = document.createElement("div");
        messageContainer.id = "logger-container-message";
        messageContainer.className = self.Options.MessageClass;
        let loggerContainer = document.createElement("div");
        loggerContainer.id = "logger-container";
        loggerContainer.className = "logger-container";
        loggerContainer.style.display = "none";
        loggerContainer.className = self.Options.ContainerClass;
        let footer = document.createElement("div");
        footer.className = "logger-container-footer";
        let okBtn = document.createElement("button");
        okBtn.className = self.Options.ButtonClass;
        okBtn.value = "OK";
        okBtn.innerText = "OK";
        okBtn.onclick = function () {
            loggerContainer.style.display = "none";
            return false;
        };
        footer.appendChild(okBtn);
        loggerContainer.appendChild(messageContainer);
        loggerContainer.appendChild(footer);
        self.RootElement.appendChild(loggerContainer);
    }
}
exports.HTMLLogger = HTMLLogger;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogger_1 = require("./ConsoleLogger");
class Logger {
    static LogMessage(message) {
        Logger.Loggers.forEach(logger => {
            logger.LogMessage(message);
        });
    }
    static LogError(errorMessage, data) {
        Logger.Loggers.forEach(logger => {
            logger.LogError(errorMessage, data);
        });
    }
}
Logger.Loggers = [new ConsoleLogger_1.ConsoleLogger()];
exports.Logger = Logger;

},{"./ConsoleLogger":5}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelHelper {
}
exports.ModelHelper = ModelHelper;

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchClient {
    constructor(HttpClient) {
        this.HttpClient = HttpClient;
    }
    QuerySearch(queryText) {
        return this.HttpClient.Request(`/_api/search/query?querytext='${queryText}'`, "GET");
    }
    QuerySearchWithComplexQuery(complexQuery) {
        return this.HttpClient.Request(`/_api/search/query${complexQuery}`, "GET");
    }
}
exports.SearchClient = SearchClient;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchQueryBuilder {
    BuildQuery(queryText, skip = 0) {
        return `?querytext='${queryText}'${this.BuildScopePart()}${this.BuildSkipAndTop(skip)}${this.BuildSelect()}`;
    }
}
exports.SearchQueryBuilder = SearchQueryBuilder;
class SimpleSearchQueryBuilder extends SearchQueryBuilder {
    constructor(ScopeId, Top = 10, Fields) {
        super();
        this.ScopeId = ScopeId;
        this.Top = Top;
        this.Fields = Fields;
    }
    BuildScopePart() {
        if (this.ScopeId)
            return `&sourceid='${this.ScopeId}'`;
        return "";
    }
    BuildSkipAndTop(skip = 0) {
        return `&startrow=${skip}&rowlimit=${this.Top}`;
    }
    BuildSelect() {
        if (this.Fields)
            return `&selectProperties='${this.Fields.join(',')}'`;
        return "";
    }
}
exports.SimpleSearchQueryBuilder = SimpleSearchQueryBuilder;
class UserSearchQueryBuilder extends SimpleSearchQueryBuilder {
    constructor() {
        super("b09a7990-05ea-4af9-81ef-edfab16c4e31", 10, ['PreferredName', 'AccountName', 'Department', 'JobTitle', 'PictureURL', 'UserProfile_GUID', 'WorkEmail']);
    }
}
exports.UserSearchQueryBuilder = UserSearchQueryBuilder;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayHelpers_1 = require("../ArrayHelpers");
class UserSearchResultMapper {
    MapToEntity(searchResults) {
        if (searchResults &&
            searchResults.PrimaryQueryResult &&
            searchResults.PrimaryQueryResult.RelevantResults &&
            searchResults.PrimaryQueryResult.RelevantResults.Table &&
            searchResults.PrimaryQueryResult.RelevantResults.Table.Rows) {
            return searchResults.PrimaryQueryResult.RelevantResults.Table.Rows.map((row) => {
                return {
                    AccountName: ArrayHelpers_1.ArrayHelper.FindValueByKey(row.Cells, "AccountName"),
                    Department: ArrayHelpers_1.ArrayHelper.FindValueByKey(row.Cells, "Department"),
                    JobTitle: ArrayHelpers_1.ArrayHelper.FindValueByKey(row.Cells, "JobTitle"),
                    PictureURL: ArrayHelpers_1.ArrayHelper.FindValueByKey(row.Cells, "PictureURL"),
                    PreferredName: ArrayHelpers_1.ArrayHelper.FindValueByKey(row.Cells, "PreferredName"),
                    UserProfile_GUID: ArrayHelpers_1.ArrayHelper.FindValueByKey(row.Cells, "UserProfile_GUID"),
                    WorkEmail: ArrayHelpers_1.ArrayHelper.FindValueByKey(row.Cells, "WorkEmail"),
                };
            });
        }
        return [];
    }
}
exports.UserSearchResultMapper = UserSearchResultMapper;

},{"../ArrayHelpers":3}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
}
exports.Query = Query;

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"../Helpers/RESTQueryHelper":9,"./../Client/HttpClient":1}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchDrivenDataProvider {
    constructor(ResultMapper, SearchClient, QueryBuilder) {
        this.ResultMapper = ResultMapper;
        this.SearchClient = SearchClient;
        this.QueryBuilder = QueryBuilder;
    }
    Get(query) {
        let self = this;
        let searchQuery = this.QueryBuilder.BuildQuery(query.Query || "", query.Skip);
        return self.SearchClient.QuerySearchWithComplexQuery(searchQuery).then((results) => {
            return self.ResultMapper.MapToEntity(results);
        });
    }
}
exports.SearchDrivenDataProvider = SearchDrivenDataProvider;

},{}],18:[function(require,module,exports){
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

},{"./BasicEntityRepository":14}],19:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./Client/HttpClient");
const SearchClient_1 = require("./Helpers/Search/SearchClient");
__export(require("./Client/HttpClient"));
__export(require("./Client/MockHttpClient"));
__export(require("./Helpers/ModelHelper"));
__export(require("./Helpers/Search/SearchClient"));
__export(require("./Helpers/RESTQueryHelper"));
__export(require("./Model/Query"));
__export(require("./Repository/RESTEntityRepository"));
__export(require("./Repository/BasicEntityRepository"));
__export(require("./Repository/SessionStorageRepository"));
__export(require("./Repository/ComposedEntityRepository"));
__export(require("./Repository/SearchDrivenDataProvider"));
__export(require("./Helpers/Logger/ConsoleLogger"));
__export(require("./Helpers/Logger/Logger"));
__export(require("./Helpers/Logger/HTMLLogger"));
__export(require("./Helpers/ComponentHelpers/PeoplePickerHelper"));
__export(require("./Helpers/Search/SearchClient"));
__export(require("./Helpers/Search/SearchQueryBuilder"));
__export(require("./Helpers/Search/UserSearchResultMapper"));
__export(require("./Helpers/ArrayHelpers"));
let httpClient = new HttpClient_1.HttpClient();
let searchClient = new SearchClient_1.SearchClient(httpClient);
console.log(searchClient);

},{"./Client/HttpClient":1,"./Client/MockHttpClient":2,"./Helpers/ArrayHelpers":3,"./Helpers/ComponentHelpers/PeoplePickerHelper":4,"./Helpers/Logger/ConsoleLogger":5,"./Helpers/Logger/HTMLLogger":6,"./Helpers/Logger/Logger":7,"./Helpers/ModelHelper":8,"./Helpers/RESTQueryHelper":9,"./Helpers/Search/SearchClient":10,"./Helpers/Search/SearchQueryBuilder":11,"./Helpers/Search/UserSearchResultMapper":12,"./Model/Query":13,"./Repository/BasicEntityRepository":14,"./Repository/ComposedEntityRepository":15,"./Repository/RESTEntityRepository":16,"./Repository/SearchDrivenDataProvider":17,"./Repository/SessionStorageRepository":18}]},{},[19])(19)
});
