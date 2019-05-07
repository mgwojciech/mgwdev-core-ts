export class HttpClient {
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
                //leave the possibily to use with file and ftp protocol
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
