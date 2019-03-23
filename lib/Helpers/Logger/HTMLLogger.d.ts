import { ILogger } from "./ILogger";
export declare class HTMLLogger implements ILogger {
    Options: {
        ButtonClass: string;
        MessageClass: string;
        ContainerClass: string;
    };
    RootElement: Element;
    constructor(rootElementId: string, Options?: {
        ButtonClass: string;
        MessageClass: string;
        ContainerClass: string;
    });
    LogMessage(message: string): void;
    LogError(errorMessage: string, data?: any): void;
    protected RenderMessage(htmlMessage: string): void;
    protected InitContainer(): void;
}
