import { NextFunction, Request, Response } from "express";
import { ApplicationError, InternalSeverError } from "../app/errors";
import UserService from "./UserService";
import UserEntity from "./UserEntity";
import { StatusCodes } from "http-status-codes";

class UserController {
  static handleUncaughtErrors(err: Error, genericErrorMessage: string) {
    const isExpectedError = err instanceof ApplicationError;
    return isExpectedError
      ? err
      : new InternalSeverError(
          genericErrorMessage,
          StatusCodes.INTERNAL_SERVER_ERROR,
          err,
        );
  }

  static errorMessages = {
    login:
      "Oops! Something went wrong while trying to log you in. We now know about it and are looking into it. Please try again later.",
    registration:
      "Oops! Something went wrong during registration. We now know about it and are looking into it. Please try again later.",
  };

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const userEntity = new UserEntity(req.body);
    try {
      const token = await this.userService.login(userEntity);
      res.send({ token });
    } catch (error) {
      next(
        UserController.handleUncaughtErrors(
          error,
          UserController.errorMessages.login,
        ),
      );
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const userEntity = new UserEntity(req.body);
    try {
      userEntity.validate();
      const result = await this.userService.register(userEntity);
      res.status(201).send(result);
    } catch (error) {
      next(
        UserController.handleUncaughtErrors(
          error,
          UserController.errorMessages.registration,
        ),
      );
    }
  }
}

export default UserController;
