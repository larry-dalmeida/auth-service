import { describe, expect, beforeAll, it } from "@jest/globals";
import request from "supertest";

import { initializeServer } from "../src/utils";
import { generateMockCredentials } from "./mocks";

describe("Registration", () => {
  let server;

  beforeAll(() => {
    server = initializeServer();
  });

  it("should register a new user", async () => {
    const res = await request(server)
      .post("/register")
      .send(generateMockCredentials());

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });
});
