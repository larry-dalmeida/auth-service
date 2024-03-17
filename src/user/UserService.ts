import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "./UserRepository";
import {
  InvalidCredentialsError,
  MalformedRequestError,
  UserAlreadyExistsError,
} from "./errors";
import UserEntity from "./UserEntity";

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

  async login(userEntity: UserEntity) {
    const { email, password } = userEntity;
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

  async register(userEntity: UserEntity) {
    const { email, password } = userEntity;
    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.createUser(email, hashedPassword);
  }
}

export default UserService;
