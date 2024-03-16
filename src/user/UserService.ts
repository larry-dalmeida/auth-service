import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "./UserRepository";
import {
  InvalidCredentialsError,
  MalformedRequestError,
  UserAlreadyExistsError,
} from "./errors";

class UserService {
  static getToken(userId: string, jwtSecret: string) {
    return jwt.sign({ userId }, jwtSecret, {
      expiresIn: "1h",
    });
  }

  static isValidPassword(
    currentlyProvidedPassword: string,
    previouslyHashedPassword: string
  ) {
    return bcrypt.compare(currentlyProvidedPassword, previouslyHashedPassword);
  }

  constructor(
    private userRepository: UserRepository,
    private jwtSecret: string
  ) {
    this.userRepository = userRepository;
    this.jwtSecret = jwtSecret;
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new MalformedRequestError();
    }

    const user = await this.userRepository.getUserByEmail(email);

    if (user === null) {
      throw new InvalidCredentialsError();
    }

    const isMatch = await UserService.isValidPassword(password, user.password);

    if (isMatch) {
      return UserService.getToken(user.id, this.jwtSecret);
    }

    throw new InvalidCredentialsError();
  }

  async register(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.createUser(name, email, hashedPassword);
  }
}

export default UserService;
