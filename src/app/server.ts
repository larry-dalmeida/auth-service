import express from "express";
import bodyParser from "body-parser";
import Database from "./db";

import { Route } from "./types";
import errorHandler from "./middleware/errorHandler";

declare global {
  var db: Database;
}

const createServer = (routes: Route[], logger: any) => {
  const app = express();

  // Common Middleware
  app.use(bodyParser.json());
  app.use(logger);

  routes.forEach((route: Route) => {
    app[route.method](route.path, route.handler);
  });

  app.use(errorHandler);

  return app;
};

export default createServer;
