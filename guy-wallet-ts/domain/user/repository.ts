import { User } from "./model";

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
   * Creates a new user
   * Doesn't use the user id specified in the user object, but generates a new one
   * @param user
   * @returns {string} The user id
   */
  create(user: User): Promise<string>;

  /**
   * Updates a user
   * @param user
   */
  update(user: User): Promise<User>;
}
