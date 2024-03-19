import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../../errors";
import { ValidationError } from "joi";

type CustomError = ApplicationError | ValidationError | Error;

const genericErrorMessage =
  "Oops! Something went wrong. We now know about it and are working hard to fix it. Please try again later.";

function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const error = ApplicationError.getEnrichedError(err, genericErrorMessage);

  res.statusCode = error.code;

  const responseBody = {
    message: err.message,
    stack: err.stack,
  };

  res.json(responseBody);
}

export default errorHandler;
