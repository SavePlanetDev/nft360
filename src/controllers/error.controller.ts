import { Request, Response, NextFunction } from "express";
import { responseData } from "../utils/response";

export interface IAppError extends Error {
  status: any;
  statusCode: number;
  functionCall: any;
  result: boolean;
}

export default (
  error: IAppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  responseData(
    res,
    error.status,
    error.statusCode,
    error.functionCall,
    error.message,
    error.result
  );
};
