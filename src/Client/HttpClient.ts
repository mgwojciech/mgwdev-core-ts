import { IHttpClient } from "./IHttpClient";

export class HttpClient implements IHttpClient {
    constructor(public DefaultHeaders: { key: string; value: string; }[] = [{
        key: "accept",
        value: "application/json"
    }]){

    }
    public Request<T, U>(url: string, method: string, options?: {
        headers?: { key: string; value: string; }[],
        responseParser?: (responseText: string) => T,
        requestData?: U
    }): Promise<T> {
        let self = this;
        return new Promise<T>((resolve, error) => {
            var oReq = new XMLHttpRequest();
            oReq.onreadystatechange = function (ev) {
                //leave the possibily to use with file and ftp protocol
                if (self.IsRequestValid(oReq)) {
                    if (options && options.responseParser)
                        resolve(options.responseParser(oReq.responseText));
                    else
                        resolve(JSON.parse(oReq.responseText));
                }
                else if(oReq.status >= 400)
                    error(oReq);
            }
            oReq.open(method, url, true);
            self.DefaultHeaders.forEach((header)=>{
                oReq.setRequestHeader(header.key,header.value)
            })
            if (options && options.requestData)
                oReq.send(JSON.stringify(options.requestData));
            else
                oReq.send();
        })
    }
    protected IsRequestValid(oReq: XMLHttpRequest): boolean {
        if (oReq.readyState == 4) {
            if (oReq.status == 200)
                return true;
            else
                return false;
        }
        return false;
    }
}