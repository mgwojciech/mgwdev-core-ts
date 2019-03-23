import { IHttpClient } from "./IHttpClient";
export declare class MockHttpClient implements IHttpClient {
    protected RequestResponseCollection: {
        url: string;
        method: string;
        response: any;
    }[];
    Calls: {
        url: string;
        method: string;
        response: any;
        options?: {
            headers?: {
                key: string;
                value: string;
            }[];
            response: any;
        };
    }[];
    constructor(RequestResponseCollection: {
        url: string;
        method: string;
        response: any;
    }[]);
    Request<T, U>(url: string, method: string, options?: {
        headers?: {
            key: string;
            value: string;
        }[];
        responseParser?: (responseText: string) => T;
        requestData?: U;
    }): Promise<T>;
}
