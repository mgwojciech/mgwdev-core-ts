import { ConsoleLogger } from "./ConsoleLogger";
export class Logger {
    static LogMessage(message) {
        Logger.Loggers.forEach(logger => {
            logger.LogMessage(message);
        });
    }
    static LogError(errorMessage, data) {
        Logger.Loggers.forEach(logger => {
            logger.LogError(errorMessage, data);
        });
    }
}
Logger.Loggers = [new ConsoleLogger()];
