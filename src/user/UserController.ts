import { Request, Response } from "express";
import { InvalidCredentialsError, MalformedRequestError } from "./errors";
import UserService from "./UserService";
import bcrypt from "bcrypt";
import { UserLoginDTO, UserRegisterDTO } from "./dto";

class UserController {
  static GENERIC_ERROR_MESSAGE = "Error logging in";

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  async login(req: Request, res: Response) {
    const userLoginDTO = new UserLoginDTO(req.body);
    try {
      const token = await this.userService.login(userLoginDTO);
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
    const userRegistrationDTO = new UserRegisterDTO(req.body);

    try {
      const result = await this.userService.register(userRegistrationDTO);
      res.status(201).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error registering the user");
    }
  }
}

export default UserController;
