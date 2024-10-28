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