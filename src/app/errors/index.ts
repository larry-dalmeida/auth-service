import { StatusCodes } from "http-status-codes";
import { ValidationError } from "joi";

export class CustomValidationError extends ValidationError {
  code: number;
  constructor(validationError: ValidationError, code: number) {
    super(validationError.message, validationError.details, validationError);
    this.code = code;
  }
}

export class ApplicationError extends Error {
  code: number;

  static getEnrichedError(err: Error, genericErrorMessage: string) {
    const isExpectedError = err instanceof ApplicationError;

    if (isExpectedError) {
      return err;
    }

    const isValidationError = err instanceof ValidationError;

    if (isValidationError) {
      return new CustomValidationError(err, StatusCodes.BAD_REQUEST);
    }

    return new InternalSeverError(
      genericErrorMessage,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err,
    );
  }

  constructor(customMessage: string, customCode: number) {
    super(customMessage);
    this.name = this.constructor.name;
    this.code = customCode;
    this.message = customMessage;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(this.message).stack;
    }
  }
}

export class InvalidCredentialsError extends ApplicationError {
  static defaultCode = StatusCodes.UNAUTHORIZED;
  static defaultMessage = "Invalid credentials";

  constructor(
    customMessage = InvalidCredentialsError.defaultMessage,
    customCode = InvalidCredentialsError.defaultCode,
  ) {
    super(customMessage, customCode);
  }
}

export class MalformedRequestError extends ApplicationError {
  static defaultCode = StatusCodes.BAD_REQUEST;
  static defaultMessage = "Malformed Request";

  constructor(
    customMessage = MalformedRequestError.defaultMessage,
    customCode = MalformedRequestError.defaultCode,
  ) {
    super(customMessage, customCode);
  }
}

export class UserAlreadyExistsError extends ApplicationError {
  static defaultCode = StatusCodes.CONFLICT;
  static defaultMessage = "User already exists";

  constructor(
    customMessage = UserAlreadyExistsError.defaultMessage,
    customCode = UserAlreadyExistsError.defaultCode,
  ) {
    super(customMessage, customCode);
  }
}

export class InternalSeverError extends ApplicationError {
  static defaultCode = StatusCodes.INTERNAL_SERVER_ERROR;
  static defaultMessage =
    "Oops! Something went wrong. We now know about it and working to fix it.";

  constructor(
    customMessage = UserAlreadyExistsError.defaultMessage,
    customCode = UserAlreadyExistsError.defaultCode,
    error?: Error,
  ) {
    super(customMessage, customCode);

    if (error) {
      this.cause = error.cause;
      this.stack = error.stack;
    }
  }
}
