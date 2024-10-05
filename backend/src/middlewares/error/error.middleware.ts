import { Request, Response, NextFunction } from "express";
import appError from "../../utils/appError";
import { sendErrorDev, sendErrorProd } from "../../utils/envError";

// Extend the Express Request interface to add custom error properties if needed
interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  errData?: any;
}

// Unsupported 404 routes
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new appError(`Can't find ${req.originalUrl} on this server`, 400));
};

// Global Error Handling Middleware
export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.errData = err.errData;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};
