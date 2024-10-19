import { User } from "../model/user";

/**
 * IUserRepository
 */
export interface IUserRepository {
  /**
   * Finds a user by email
   * @param email
   * @returns {User | null}
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Finds a user by id
   * @param id
   * @returns {User | null}
   */
  findById(id: string): Promise<User | null>;

  /**
   * Saves a user
   * @param user
   */
  save(user: User): Promise<void>;
}
