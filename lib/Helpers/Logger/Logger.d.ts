import { ILogger } from "./ILogger";
export declare class Logger {
    static Loggers: ILogger[];
    static LogMessage(message: string): void;
    static LogError(errorMessage: string, data?: any): void;
}
