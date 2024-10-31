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

  async create(user: User): Promise<string> {
    user.id = Math.random().toString();
    this.users.push(user);
    return user.id;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users[index] = user;
  }
}
