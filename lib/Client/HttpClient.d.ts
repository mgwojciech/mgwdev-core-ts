import { IHttpClient } from "./IHttpClient";
export declare class HttpClient implements IHttpClient {
    Request<T, U>(url: string, method: string, options?: {
        headers?: {
            key: string;
            value: string;
        }[];
        responseParser?: (responseText: string) => T;
        requestData?: U;
    }): Promise<T>;
    protected IsRequestValid(oReq: XMLHttpRequest): boolean;
}
