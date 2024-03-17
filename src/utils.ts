import createServer from "./app/server";
import appRoutes from "./app/routes";
import UserRoutes from "./user/UserRoutes";
import UserController from "./user/UserController";
import UserRepository from "./user/UserRepository";
import UserService from './user/UserService';
import Database from "./app/db";
import AppConfig from "./config/AppConfig";

export const initializeServer = (config: AppConfig) => {
  global.db = new Database(config.db);
  const userRepository = new UserRepository(global.db);
  const userService = new UserService(userRepository, config.auth.jwtSecret);
  const userController = new UserController(userService);
  const userRoutes = new UserRoutes(userController).getRoutes();
  const server = createServer([...userRoutes, ...appRoutes]);
  return server;
};

export const startServer = (config) => {
  const server = initializeServer(config);
  server.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`);
  });
};
