/**
 * User class
 */
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string, // Hashed password
    public createdAt: Date = new Date()
  ) { }

  public changePassword(newHashedPassword: string) {
    this.password = newHashedPassword;
  }
}
