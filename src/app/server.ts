import express from "express";
import bodyParser from "body-parser";
import Database from "./db";

import { RouteConfig } from "./types";
import errorHandler from "./middleware/errorHandler";
import { getRouterWithRoutes } from "./routes";

declare global {
  var db: Database;
}

const createServer = (routeConfig: RouteConfig, logger: any) => {
  const app = express();

  // Common Middleware
  app.use(bodyParser.json());
  app.use(logger);

  Object.keys(routeConfig).forEach((rootPath) => {
    app.use(rootPath, getRouterWithRoutes(routeConfig[rootPath]));
  });

  app.use(errorHandler);

  return app;
};

export default createServer;
