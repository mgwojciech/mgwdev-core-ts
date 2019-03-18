import { ILogger } from "./ILogger";
import { ConsoleLogger } from "./ConsoleLogger";

export class Logger {
    public static Loggers: ILogger[] = [new ConsoleLogger()];

    public static LogMessage(message:string): void{
        Logger.Loggers.forEach(logger=>{
            logger.LogMessage(message);
        });
    }
    public static LogError(errorMessage: string, data?: any){
        Logger.Loggers.forEach(logger=>{
            logger.LogError(errorMessage, data);
        });
    }
}