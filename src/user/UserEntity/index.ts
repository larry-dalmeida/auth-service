import Joi, { ValidationResult, ValidationError } from "joi";

type UserEntityData = {
  email: string;
  password: string;
};

class UserEntity {
  email: string;
  password: string;

  static schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  constructor(data: UserEntityData) {
    this.email = data.email;
    this.password = data.password;
  }

  validate() {
    const result: ValidationResult = UserEntity.schema.validate({
      email: this.email,
      password: this.password,
    });
    if (result.error instanceof ValidationError) {
      throw result.error;
    }
  }
}

export default UserEntity;
