import { StatusCodes } from "http-status-codes";

export class InvalidCredentialsError extends Error {
  static defaultCode = StatusCodes.FORBIDDEN;
  static defaultMessage = "Invalid credentials";

  code: number;
  message: string;

  constructor(
    customMessage = InvalidCredentialsError.defaultMessage,
    code = InvalidCredentialsError.defaultCode
  ) {
    super(customMessage);
    this.name = this.constructor.name;
    this.code = code;
    this.message = customMessage;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(this.message).stack;
    }
  }
}

export class MalformedRequestError extends Error {
  static defaultCode = StatusCodes.BAD_REQUEST;
  static defaultMessage = "Malformed Request";

  code: number;
  message: string;

  constructor(
    customMessage = MalformedRequestError.defaultMessage,
    code = MalformedRequestError.defaultCode
  ) {
    super(customMessage);
    this.name = this.constructor.name;
    this.code = code;
    this.message = customMessage;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(this.message).stack;
    }
  }
}

export class UserAlreadyExistsError extends Error {
  static defaultCode = StatusCodes.CONFLICT;
  static defaultMessage = "User already exists";

  code: number;
  message: string;

  constructor(
    customMessage = MalformedRequestError.defaultMessage,
    code = MalformedRequestError.defaultCode
  ) {
    super(customMessage);
    this.name = this.constructor.name;
    this.code = code;
    this.message = customMessage;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(this.message).stack;
    }
  }
}
