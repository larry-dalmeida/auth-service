import { NextFunction, Request, Response } from "express";
import { ApplicationError, InternalSeverError } from "../../errors";
import { StatusCodes } from "http-status-codes";

type CustomError = ApplicationError | Error;

function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const isExpectedApplicationError = err instanceof ApplicationError;
  const error: ApplicationError = isExpectedApplicationError
    ? err
    : new InternalSeverError(
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        err,
      );

  res.statusCode = error.code;

  const responseBody = {
    message: err.message,
    stack: err.stack,
  };

  res.json(responseBody);
}

export default errorHandler;
