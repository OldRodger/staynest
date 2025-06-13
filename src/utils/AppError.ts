export default class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public status: string;

  constructor(message: string, statuscode: number = 500) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    this.statusCode = statuscode;
    this.status = String(statuscode).startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}
