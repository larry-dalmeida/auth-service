import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../app/errors";
import UserService from "./UserService";
import UserEntity from "./UserEntity";

class UserController {
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
        ApplicationError.getEnrichedError(
          error,
          UserController.errorMessages.login,
        ),
      );
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const userEntity = new UserEntity(req.body);
    try {
      await userEntity.validate();
      const result = await this.userService.register(userEntity);
      res.status(201).send(result);
    } catch (error) {
      next(
        ApplicationError.getEnrichedError(
          error,
          UserController.errorMessages.registration,
        ),
      );
    }
  }
}

export default UserController;
