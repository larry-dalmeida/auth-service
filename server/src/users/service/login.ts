import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../repository";

const getToken = (userId: string) =>
  jwt.sign({ userId }, process.env.SECRET!, {
    expiresIn: "1h",
  });

const isValidPassword = (
  currentlyProvidedPassword: string,
  previouslyHashedPassword: string
) => bcrypt.compare(currentlyProvidedPassword, previouslyHashedPassword);

const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid credentials",
  ERROR_LOGGING_IN: "Error logging in",
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await getUserByEmail(email);

    if (result.rows.length === 0) {
      res.status(400).send(ERROR_MESSAGES.INVALID_CREDENTIALS);
      return;
    }

    const user = result.rows[0];
    const isMatch = await isValidPassword(password, user.password);
    return isMatch
      ? res.send({ token: getToken(user.id) })
      : res.status(400).send(ERROR_MESSAGES.INVALID_CREDENTIALS);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.ERROR_LOGGING_IN);
  }
};

export default login;
