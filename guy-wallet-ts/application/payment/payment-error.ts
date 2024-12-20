import { ApplicationError } from "../app-error";

/**
 * Throw this error when payment not found
 */
export class PaymentNotFoundError extends ApplicationError {
  constructor() {
    super("Payment not found", 404)
  }
}

/**
 * Throw this error when payment has already been finalized
 */
export class AlreadyFinalizedPaymentError extends ApplicationError {
  constructor() {
    super("Payment has already been finalized", 400)
  }
}

/**
 * Throw this error when invalid payment party
 */
export class InvalidPaymentPartyError extends ApplicationError {
  constructor() {
    super("Invalid payment party", 400)
  }
}

/**
 * Throw this error when payment is invalid
 */
export class InvalidPaymentError extends ApplicationError {
  constructor() {
    super("Invalid payment", 400)
  }
}