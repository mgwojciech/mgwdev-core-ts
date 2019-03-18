export class ConsoleLogger {
    LogMessage(message) {
        console.log(message);
    }
    LogError(errorMessage, data) {
        console.error(errorMessage, data);
    }
}
