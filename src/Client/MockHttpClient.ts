import { IHttpClient } from "../..";

export class MockHttpClient implements IHttpClient{
    public Calls:{url: string, method: string, response: any, options: { 
        headers?: { key: string; value: string; }[]; 
        responseParser?: (responseText: string) => any, 
        requestData?: any; 
    }}[] = [];
    constructor(protected RequestResponseCollection: {url: string, method: string, response: any}[]){

    }
    Request<T, U>(url: string, method: string, options?: { headers?: { key: string; value: string; }[]; responseParser?: (responseText: string) => T; requestData?: U; }): Promise<T> {
        let self = this;
        return new Promise<T>((resolve, error)=>{
            let response = self.RequestResponseCollection.find((response)=>{
                return response.url == url && method == response.method;
            });
            self.Calls.push({
                url: url,
                method: method,
                options: options,
                response: response
            });
            if (options && options.responseParser)
                resolve(options.responseParser(response.response));
            else
                resolve(response.response);    
        });
    }

}