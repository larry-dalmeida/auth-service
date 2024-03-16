import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../repository";
import { InvalidCredentialsError, MalformedRequestError } from "../errors";

const getToken = (userId: string) =>
  jwt.sign({ userId }, process.env.SECRET!, {
    expiresIn: "1h",
  });

const isValidPassword = (
  currentlyProvidedPassword: string,
  previouslyHashedPassword: string
) => bcrypt.compare(currentlyProvidedPassword, previouslyHashedPassword);

const login = async (email: string, password: string) => {

  if (!email || !password) {
    throw new MalformedRequestError();
  }

  const result = await getUserByEmail(email);

  if (result.rows.length === 0) {
    throw new InvalidCredentialsError();
  }

  const user = result.rows[0];
  const isMatch = await isValidPassword(password, user.password);

  if (isMatch) {
    return getToken(user.id);
  }

  throw new InvalidCredentialsError();
};

export default login;
