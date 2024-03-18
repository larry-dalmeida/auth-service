import express from "express";
import bodyParser from "body-parser";
import Database from "./db";

import { Route } from "./types";

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

  return app;
};

export default createServer;
