import pino from "pino";
import PinoHttp, { HttpLogger } from "pino-http";

let config: pino.LoggerOptions;
let instance: HttpLogger;

const logger = {
  init(initialConfig: pino.LoggerOptions) {
    if (config) {
      throw new Error("Logger already initialized");
    }
    config = initialConfig;
    instance = PinoHttp(config);
  },
  get() {
    if (!instance) {
      throw new Error("Logger not initialized");
    }
    return instance;
  },
};

export default logger;
