export interface IHttpClient{
    Request<T,U>(url:string, method: string, options?:{
        headers?: { key: string; value: string; }[], 
        responseParser?:(responseText: string)=> T
        requestData?:U
    }):Promise<T>;
}