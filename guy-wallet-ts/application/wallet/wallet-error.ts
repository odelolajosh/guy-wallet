import { ApplicationError } from "../app-error";

/**
 * Thrown when balance is not sufficient for a given transaction
 */
export class InsufficientBalanceError extends ApplicationError {
  constructor() {
    super("Insufficient balance", 400)
  }
}

/**
 * Thrown when wallet is not found in the database
 */
export class WalletNotFoundError extends ApplicationError {
  constructor() {
    super("Wallet not found", 404)
  }
}

/**
 * Thrown when a virtual account creation fails
 */
export class VirtualAccountCreationError extends ApplicationError {
  constructor() {
    super("Couldn't create the wallet", 500)
  }
}