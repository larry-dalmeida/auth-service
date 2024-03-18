import { MalformedRequestError } from "../errors";

type UserEntityData = {
  email: string;
  password: string;
};

class UserEntity {
  email: string;
  password: string;

  constructor(data: UserEntityData) {
    this.email = data.email;
    this.password = data.password;
  }

  validateEmail() {
    if (!this.email) {
      throw new MalformedRequestError("Email is required");
    }
  }

  validatePassword() {
    if (!this.password) {
      throw new MalformedRequestError("Password is required");
    }
  }

  validate() {
    this.validateEmail();
    this.validatePassword();
  }
}

export default UserEntity;
