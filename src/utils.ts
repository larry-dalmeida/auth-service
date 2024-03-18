import createServer from "./app/server";
import appRoutes from "./app/routes";
import UserRoutes from "./User/UserRoutes";
import UserController from "./User/UserController";
import UserRepository from "./User/UserRepository";
import UserService from "./User/UserService";
import Database from "./app/db";
import AppConfig from "./config/AppConfig";
import logger from "./app/logger";
import { Route } from "./app/types";

export const initializeServer = (config: AppConfig) => {
  global.db = new Database(config.db);
  const userRepository = new UserRepository(global.db);
  const userService = new UserService(userRepository, config.auth.jwtSecret);
  const userController = new UserController(userService);
  const userRoutes = new UserRoutes(userController).getRoutes();
  const routes: Route[] = [...userRoutes, ...appRoutes];
  logger.init(config.logger);
  const server = createServer(routes, logger.get());
  return server;
};

export const startServer = (config: AppConfig) => {
  const server = initializeServer(config);
  server.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`);
  });
};
