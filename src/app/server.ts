import express from "express";
import bodyParser from "body-parser";
import { Pool } from "pg";

import { initPool } from "./db";
import { Route } from "./types";

declare global {
  var db: Pool
}

const createServer = (routes: Route[]) => {
  global.db = initPool();
  const app = express();

  // Common Middleware
  app.use(bodyParser.json());

  routes.forEach((route: Route) => {
    app[route.method](route.path, route.handler);
  });

  return app;
};

export default createServer;
