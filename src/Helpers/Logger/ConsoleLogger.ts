import { ILogger } from "./ILogger";

export class ConsoleLogger implements ILogger{
    public LogMessage(message: string): void{
        console.log(message);
    }
    public LogError(errorMessage: string, data?: any): void{
        console.error(errorMessage, data);
    }
}