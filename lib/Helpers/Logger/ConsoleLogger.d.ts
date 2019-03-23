import { ILogger } from "./ILogger";
export declare class ConsoleLogger implements ILogger {
    LogMessage(message: string): void;
    LogError(errorMessage: string, data?: any): void;
}
