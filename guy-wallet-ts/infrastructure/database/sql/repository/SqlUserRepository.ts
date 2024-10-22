import { IUserRepository } from "@/domain/user/repository";
import { PostgresClient } from "../postgres";
import { User } from "@/domain/user/model";

export class SqlUserRepository implements IUserRepository {
  constructor(private client: PostgresClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapUser(result.rows[0]);
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.client.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapUser(result.rows[0]);
  }

  async save(user: User): Promise<void> {
    await this.client.query(
      `INSERT INTO users (id, name, email, password, created_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, user.name, user.email, user.password, user.createdAt]
    );
  }

  private mapUser(row: any): User {
    return new User(
      row.id,
      row.name,
      row.email,
      row.password,
      row.created_at
    )
  }
}