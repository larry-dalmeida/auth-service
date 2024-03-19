import { describe, expect, beforeAll, it } from "@jest/globals";
import request from "supertest";
import { pick } from "lodash";
import { Express } from "express";

import { initializeServer } from "../src/utils";
import { generateMockCredentials } from "./mocks";
import AppConfig from "../src/config/AppConfig";

describe("Registration", () => {
  let server: Express;

  beforeAll(() => {
    server = initializeServer(new AppConfig());
  });

  it("should register a new user", async () => {
    const res = await request(server)
      .post("/register")
      .send(generateMockCredentials());

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should return a 400 for incomplete registration data", async () => {
    const credentials = generateMockCredentials();

    const res = await request(server)
      .post("/register")
      .send(pick(credentials, ["email"]));

    expect(res.statusCode).toEqual(400);
  });
});
