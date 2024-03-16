import express from "express";
import bodyParser from "body-parser";
import morgan from 'morgan';
import { Pool } from "pg";

import { Route } from "./types";

declare global {
  var db: Pool
}

const createServer = (routes: Route[]) => {
  const app = express();

  // Common Middleware
  app.use(bodyParser.json());
  app.use(morgan('combined'))

  routes.forEach((route: Route) => {
    app[route.method](route.path, route.handler);
  });

  return app;
};

export default createServer;
