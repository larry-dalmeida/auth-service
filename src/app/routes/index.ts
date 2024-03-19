import express from "express";
import { Route, RouteConfig } from "../types";
import health from "../service/health";

export const getAppRoutesConfig = (): RouteConfig => {
  return {
    "/": [
      {
        path: "/healthz",
        method: "get",
        handler: health,
      },
    ],
  };
};

export const getRouterWithRoutes = (routes: Route[]) => {
  const router = express.Router();
  routes.forEach((route: Route) => {
    router[route.method](route.path, route.handler);
  });
  return router;
};
