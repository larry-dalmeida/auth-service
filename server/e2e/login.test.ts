import { describe, expect, beforeAll, it } from "@jest/globals";
import request from "supertest";
import { pick } from "lodash";

import { initializeServer } from "../src/utils";
import { generateMockCredentials } from "./mocks";

describe("Login", () => {
  let server;

  beforeAll(() => {
    server = initializeServer();
  });

  it("should login a registered user", async () => {
    const credentials = generateMockCredentials();
    await request(server)
      .post("/register")
      .send(credentials);

    const res = await request(server)
      .post("/login")
      .send(pick(credentials, ["email", "password"]));

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});