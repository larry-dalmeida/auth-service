import * as userController from "../controller";

import { Route } from "../../app/types";
import register from "../service/register";

const routes: Route[] = [
  {
    path: "/register",
    method: "post",
    handler: register,
  },
  {
    path: "/login",
    method: "post",
    handler: userController.login,
  },
];

export default routes;
