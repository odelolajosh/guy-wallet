/**
 * Payment status represents the status of a payment transaction.
 */
export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed"
}

/**
 * Payment type represents the type of a payment transaction.
 */
export enum PaymentType {
  Transfer = "transfer",
  Subscription = "subscription",
  Deposit = "deposit",
}