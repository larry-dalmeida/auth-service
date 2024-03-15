import register from "../service/register";
import login from "../service/login";
import { Route } from "../../app/types";

const routes: Route[] = [
  {
    path: "/register",
    method: "post",
    handler: register,
  },
  {
    path: "/login",
    method: "post",
    handler: login,
  },
];

export default routes;
