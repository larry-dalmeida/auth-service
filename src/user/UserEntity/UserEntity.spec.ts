import { describe, expect, it } from "@jest/globals";
import UserEntity from ".";

describe("UserEntity", () => {
    it("should throw an error if email is not provided", () => {
        const user = new UserEntity({ email: "", password: "password" });
        expect(() => user.validate()).toThrow("Email is required");
    });
    
    it("should throw an error if password is not provided", () => {
        const user = new UserEntity({ email: "email", password: "" });
        expect(() => user.validate()).toThrow("Password is required");
    });
})