export interface ILogger{
    LogMessage(message: string): void;
    LogError(errorMessagge: string, data?: any): void;
}