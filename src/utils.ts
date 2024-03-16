import dotenv from "dotenv";

import createServer from "./app/server";
import appRoutes from "./app/routes";
import UserRoutes from "./user/UserRoutes";
import UserController from "./user/UserController";
import UserRepository from "./user/UserRepository";
import UserService from './user/UserService';
import { initPool } from "./app/db";

const loadConfig = () => {
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
  } else {
    dotenv.config();
  }
};

export const initializeServer = () => {
  loadConfig();
  global.db = initPool();
  const userRepository = new UserRepository(global.db);
  const userService = new UserService(userRepository, process.env.JWT_SECRET);
  const userController = new UserController(userService);
  const userRoutes = new UserRoutes(userController).getRoutes();
  const server = createServer([...userRoutes, ...appRoutes]);
  return server;
};

export const startServer = (port) => {
  const server = initializeServer();
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};
