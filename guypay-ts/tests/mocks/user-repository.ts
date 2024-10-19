import { User } from "@/domain/user/model";
import { IUserRepository } from "@/domain/user/repository";

export class TestUserRepository implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) ?? null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
