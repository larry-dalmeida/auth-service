import { Request, Response } from "express";
import { InvalidCredentialsError, MalformedRequestError } from "./errors";
import UserService from "./UserService";
import bcrypt from "bcrypt";

class UserController {
  static GENERIC_ERROR_MESSAGE = "Error logging in";

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await this.userService.login(email, password);
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
    const { name, email, password } = req.body;

    try {
      const result = await this.userService.register(name, email, password);
      res.status(201).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error registering the user");
    }
  }
}

export default UserController;
