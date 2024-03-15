import dotenv from "dotenv";

import createServer from "./app/server";
import userRoutes from "./users/routes";
import appRoutes from "./app/routes";

dotenv.config();

const server = createServer([...userRoutes, ...appRoutes]);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

