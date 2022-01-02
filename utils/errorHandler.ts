class ErrorHandler extends Error {
    constructor(message: string, statusCode: number) {
        super(message);
        //@ts-ignore
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;