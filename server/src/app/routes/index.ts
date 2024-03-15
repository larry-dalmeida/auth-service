import { Route } from "../types";
import health from "../service/health";

const routes: Route[] = [
  {
    path: "/health",
    method: "get",
    handler: health,
  },
];

export default routes;
