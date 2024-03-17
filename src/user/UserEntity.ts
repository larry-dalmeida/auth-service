import { MalformedRequestError } from "./errors";

class UserEntity {
  email: string;
  password: string;

  constructor(data) {
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