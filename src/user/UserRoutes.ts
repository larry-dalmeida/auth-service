import { Route } from "../app/types";
import UserController from "./UserController";

class UserRoutes {
  constructor(private userController: UserController) {
    this.userController = userController;
  }
  getRoutes() {
    const routes: Route[] = [
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
    ];
    return routes;
  }
}

export default UserRoutes;
