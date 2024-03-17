import { Request, Response } from "express";
import { InvalidCredentialsError, MalformedRequestError } from "./errors";
import UserService from "./UserService";
import UserEntity from "./UserEntity";

class UserController {
  static GENERIC_ERROR_MESSAGE = "Error logging in";

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  async login(req: Request, res: Response) {
    const userEntity = new UserEntity(req.body);
    try {
      const token = await this.userService.login(userEntity);
      res.send({ token });
    } catch (error) {
      if (
        error instanceof InvalidCredentialsError ||
        error instanceof MalformedRequestError
      ) {
        return res.status(error.code).send(error.message);
      }

      res.status(500).send(UserController.GENERIC_ERROR_MESSAGE);
    }
  }

  async register(req: Request, res: Response) {
    const userEntity = new UserEntity(req.body);
    try {
      userEntity.validate();
      const result = await this.userService.register(userEntity);
      res.status(201).send(result);
    } catch (error) {
      if(error instanceof MalformedRequestError) {
        return res.status(error.code).send(error.message);
      }
      res.status(500).send("Error registering the user");
    }
  }
}

export default UserController;
