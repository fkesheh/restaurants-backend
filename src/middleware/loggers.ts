import { method } from "./router";

// Error level list
enum errorLevel {
    INFO = 5,
    ERROR = 10
}


// Generic logger function, can be improved in the future
function logger(level: errorLevel, message: string) {
    if (level === errorLevel.ERROR) {
        console.error(message);
    }
    console.log(message);
}


// Logger for server messages
export function logServer(message: string) {
    logger(errorLevel.INFO, `[server]: ${message}`);
}


// Logger for API calls
export function logAPICall(action: method, endpoint: string, message: string = '') {
    logger(errorLevel.INFO, `[server]: API call - ${action} - ${endpoint} - ${message}`);
}


// Logger for errors
export function logError(action: method, endpoint: string, e: any) {
    logger(errorLevel.ERROR, `[server]: API call - ${action} - ${endpoint} - ${e}`);
}
