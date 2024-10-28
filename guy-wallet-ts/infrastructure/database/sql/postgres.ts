import { IConfiguration } from "@/infrastructure/config/interfaces"
import pg from "pg"
const { Pool } = pg

export class PostgresClient {
  private pool: pg.Pool

  constructor(configuration: IConfiguration) {
    this.pool = new Pool({
      user: configuration.get("DB_USER"),
      host: configuration.get("DB_HOST"),
      database: configuration.get("DB_NAME"),
      password: configuration.get("DB_PASSWORD"),
      port: parseInt(configuration.get("DB_PORT"))
    })

    this.pool.on("error", (error) => {
      console.error("Unexpected error on idle client", error)
      console.error("Exiting process")
      process.exit()
    });

    this.query("SELECT NOW()").then(result => {
      console.log("Database connection established", result.rows[0].now)
    });
  }

  async query(query: string, params: any[] = []) {
    const client = await this.pool.connect()
    try {
      const result = await client.query(query, params)
      client.release()
      return result
    } catch (error) {
      client.release()
      console.error("Error executing query", error);
      throw error;
    }
  }

  async createTransactionClient() {
    const client = await this.pool.connect()
    return new PostgresTransactionClient(client)
  }
}

export class PostgresTransactionClient {
  private client: pg.PoolClient

  constructor(client: pg.PoolClient) {
    this.client = client
  }

  async begin() {
    await this.client.query("BEGIN")
  }

  async query(query: string, params: any[] = []) {
    try {
      const result = await this.client.query(query, params)
      return result
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }

  async commit() {
    await this.client.query("COMMIT")
    this.client.release()
  }

  async rollback() {
    await this.client.query("ROLLBACK")
    this.client.release()
  }
}
