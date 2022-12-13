class AppError extends Error {
  result: boolean;
  statusCode: number;
  status: string;
  functionCall: any;
  isOperational: boolean;
  data: any;

  constructor(
    message: string,
    statusCode: number,
    functionCall: any = null,
    result: boolean = false,
    data: any = null
  ) {
    super(message);
    this.result = result;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.functionCall = functionCall;
    this.isOperational = true;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
