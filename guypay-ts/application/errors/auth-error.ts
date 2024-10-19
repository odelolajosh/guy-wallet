import { ApplicationError } from "./app-error"

/**
 * Thrown when IAuthService's login is called with invalid credentials
 */
export class InvalidEmailOrPasswordError extends ApplicationError {
  constructor() {
    super("Invalid email or password", 400)
  }
}

/**
 * Thrown when IAuthService register is called with an already exisiting email
 */
export class EmailAlreadyExistError extends ApplicationError {
  constructor() {
    super("Email already exist", 400)
  }
}

/**
 * Thrown when IOAuthService authenticate is called with an invalid or expired OAuth code
 */
export class InvalidOrExpiredOAuthError extends ApplicationError {
  constructor() {
    super("Invalid or expired OAuth code", 400)
  }
}


/**
 * Thrown when the auth service is unable to find the user
 */
export class UserNotFoundError extends ApplicationError {
  constructor() {
    super("User not found", 404)
  }
}