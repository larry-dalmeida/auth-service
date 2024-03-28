import { RouteConfig } from "../app/types";
import UserController from "./UserController";

class UserRoutes {
  constructor(private userController: UserController) {
    this.userController = userController;
  }
  getRouteConfig() {
    const routeConfig: RouteConfig = {
      "/api/v1/users": [
        {
          path: "/register",
          method: "post",
          // TODO: Why do we need this?
          handler: this.userController.register.bind(this.userController),
        },
        {
          path: "/login",
          method: "post",
          handler: this.userController.login.bind(this.userController),
        },
      ],
    };
    return routeConfig;
  }
}

export default UserRoutes;
