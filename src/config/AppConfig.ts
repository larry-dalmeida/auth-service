class AppConfig {
  public db: any;
  public context: any;
  public server: any;
  public auth: any;

  static configDb() {
    return {
      name: process.env.DATABASE_NAME,
      databaseUrl: process.env.DATABASE_URL,
    };
  }

  static configContext() {
    return {
      version: process.env.VERSION,
      environment: process.env.ENVIRONMENT,
    };
  }

  static configServer () {
    return {
      port: process.env.PORT,
    }
  }

  static configAuth () {
    return {
      jwtSecret: process.env.JWT_SECRET,
    }
  }

  constructor() {
    this.db = AppConfig.configDb();
    this.context = AppConfig.configContext();
    this.server = AppConfig.configServer();
    this.auth = AppConfig.configAuth();
  }
}

export default AppConfig;
