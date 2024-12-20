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

  async create(user: User): Promise<string> {
    const result = await this.client.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [user.name, user.email, user.password]
    );
    return result.rows[0].id;
  }

  async update(user: User): Promise<User> {
    const result = await this.client.query(
      `UPDATE users
       SET name = $2, email = $3, password = $4, avatar_url = $5
       WHERE id = $1 RETURNING *`,
      [user.id, user.name, user.email, user.password, user.avatar]
    );

    return this.mapUser(result.rows[0]);
  }

  private mapUser(row: any): User {
    return new User(
      row.id,
      row.name,
      row.email,
      row.password,
      row.avatar_url,
      row.created_at
    )
  }
}