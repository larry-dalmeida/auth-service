import { Request, Response } from "express";
import { InvalidCredentialsError, MalformedRequestError } from "./errors";
import loginService from "./service/login";

const GENERIC_ERROR_MESSAGE = "Error logging in";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginService(email, password);
    res.send({ token });
  } catch (error) {
    console.log(error);
    if (error instanceof InvalidCredentialsError || error instanceof MalformedRequestError) {
      return res.status(error.code).send(error.message);
    }

    res.status(500).send(GENERIC_ERROR_MESSAGE);
  }
};
