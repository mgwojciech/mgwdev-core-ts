import { IHttpClient } from "./IHttpClient";
export declare class HttpClient implements IHttpClient {
    DefaultHeaders: {
        key: string;
        value: string;
    }[];
    constructor(DefaultHeaders?: {
        key: string;
        value: string;
    }[]);
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
