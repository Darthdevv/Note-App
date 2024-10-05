import { Response } from "express";

// Define the custom error interface
interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  errData?: any;
  isOperational?: boolean;
}

export const sendErrorDev = (err: CustomError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    data: err.errData,
    stack: err.stack,
    error: err,
  });
};

export const sendErrorProd = (err: CustomError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational === true) {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message,
      data: err.errData,
    });
  } else {
    // Programming or other unknown errors: don't leak error details
    // 1) Log Error
    console.error("ERROR 💥:", err);
    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};
