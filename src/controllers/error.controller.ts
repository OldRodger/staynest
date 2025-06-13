import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.ts";

export default function (
  err: (Error & { statusCode?: number; status?: string }) | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "production") {
    return sendErrorProd(res, err);
  }

  return sendErrorDev(res, err);
}

// PRODUCTION ERROR HANDLER
function sendErrorProd(res: Response, err: Error | AppError) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Oops! Something went wrong.",
  });
}

// DEVELOPMENT ERROR HANDLER
function sendErrorDev(
  res: Response,
  err: (Error & { statusCode?: number; status?: string }) | AppError
) {
  return res.status(err.statusCode!).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
}
