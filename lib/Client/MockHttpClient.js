export class MockHttpClient {
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
