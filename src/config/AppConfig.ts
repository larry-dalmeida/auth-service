import { PoolConfig } from "pg";

export type DatabaseConfig = {
  name: string;
  poolConfig: PoolConfig;
};

class AppConfig {
  public db: DatabaseConfig;
  public context: any;
  public server: any;
  public auth: any;

  static configDb() {
    return {
      name: process.env.DATABASE_INSTANCE_NAME || "default",
      poolConfig:{
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5433,
        user: process.env.DATABASE_USER || "postgres",
        password: process.env.DATABASE_PASSWORD || "postgres",
      }
    };
  }

  static configContext() {
    return {
      version: process.env.VERSION,
      environment: process.env.ENVIRONMENT,
    };
  }

  static configServer() {
    return {
      port: process.env.PORT,
    };
  }

  static configAuth() {
    return {
      jwtSecret: process.env.JWT_SECRET,
    };
  }

  constructor() {
    this.db = AppConfig.configDb();
    this.context = AppConfig.configContext();
    this.server = AppConfig.configServer();
    this.auth = AppConfig.configAuth();
  }
}

export default AppConfig;
