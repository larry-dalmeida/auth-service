import dotenv from "dotenv";

import createServer from "./app/server";
import userRoutes from "./users/routes";
import appRoutes from "./app/routes";

const loadConfig = () => {
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
  } else {
    dotenv.config();
  }
};

export const initializeServer = () => {
  loadConfig();
  const server = createServer([...userRoutes, ...appRoutes]);
  return server;
};

export const startServer = () => {
  const PORT = process.env.PORT;
  const server = initializeServer();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};
