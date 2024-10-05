class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  errorData: any | null;

  constructor(message: string, statusCode: number, errorData?: any) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errorData = errorData ? errorData : null;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
