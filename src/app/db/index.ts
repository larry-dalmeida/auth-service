import { Pool, QueryResult, QueryResultRow } from "pg";
import { DatabaseConfig } from "../../config/AppConfig";

class Database {
  name: string;
  connectionPool: Pool;

  constructor(config: DatabaseConfig) {
    this.name = config.name;
    this.connectionPool = new Pool(config.poolConfig);

    this.endConnectionPool = this.endConnectionPool.bind(this);
    this.query = this.query.bind(this);

    this.setHandlers();
  }

  async query<T extends QueryResultRow>(
    text: string,
    params?: any[],
  ): Promise<QueryResult<T>> {
    let client = null;
    try {
      client = await this.connectionPool.connect();
      return (await client.query(text, params)) as QueryResult<T>;
    } catch (err) {
      console.error(
        err,
        `[${this.name}] Unexpected error on connection attempt.`,
      );
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  getPoolStats() {
    return {
      total: this.connectionPool.totalCount,
      idle: this.connectionPool.idleCount,
      waiting: this.connectionPool.waitingCount,
    };
  }

  setHandlers() {
    this.connectionPool.on("error", (err) => {
      console.error(err, `[${this.name}] Unexpected error on idle client.`);
      process.exit(-1);
    });

    process.on("exit", this.endConnectionPool);
    process.on("SIGINT", this.endConnectionPool);
    process.on("SIGTERM", this.endConnectionPool);
  }

  // Shutdown gracefully
  endConnectionPool() {
    this.connectionPool.end(() => {
      console.info(`[${this.name}] Connection pool has ended`);
      process.exit(0);
    });
  }
}

export default Database;
