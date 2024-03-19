import { describe, expect, beforeAll, it } from "@jest/globals";
import request from "supertest";
import { Express } from "express";
import { pick } from "lodash";

import { initializeServer } from "../src/utils";
import { generateMockCredentials } from "./mocks";
import AppConfig from "../src/config/AppConfig";
import { LOGIN_API_URL, REGISTRATION_API_URL } from "./constants";

describe("Login", () => {
  let server: Express;

  beforeAll(() => {
    server = initializeServer(new AppConfig());
  });

  it("should login a registered user", async () => {
    const credentials = generateMockCredentials();

    await request(server).post(REGISTRATION_API_URL).send(credentials);

    const res = await request(server)
      .post(LOGIN_API_URL)
      .send(pick(credentials, ["email", "password"]));

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return a 401 for invalid credentials", async () => {
    const credentials = generateMockCredentials();

    const res = await request(server)
      .post(LOGIN_API_URL)
      .send(pick(credentials, ["email", "password"]));

    expect(res.statusCode).toEqual(401);
    expect(res.body).not.toHaveProperty("token");
  });

  it("should return a 400 for incomplete login data", async () => {
    const credentials = generateMockCredentials();

    const res = await request(server)
      .post(LOGIN_API_URL)
      .send(pick(credentials, ["email"]));

    expect(res.statusCode).toEqual(400);
  });
});
