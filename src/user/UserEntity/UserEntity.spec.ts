import { describe, expect, it } from "@jest/globals";
import { ValidationError } from "joi";
import UserEntity from ".";

describe("UserEntity", () => {
  it("should throw an error if email is not provided", () => {
    const user = new UserEntity({ email: "", password: "password" });
    expect(() => user.validate()).toThrow(ValidationError);
  });

  it("should throw an error if password is not provided", () => {
    const user = new UserEntity({ email: "email", password: "" });
    expect(() => user.validate()).toThrow(ValidationError);
  });
});
