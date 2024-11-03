import { Payment } from "./model";

export interface IPaymentRepository {

  /**
   * Get payments by user id
   * @param userId The user id
   */
  getByUserId(userId: string): Promise<Payment[]>

  /**
   * Get the payment by id
   * @param paymentId The payment id
   */
  getById(paymentId: string): Promise<Payment | null>

  /**
   * Get the payment by reference
   * @param reference The reference
   */
  getByReference(reference: string): Promise<Payment | null>

  /**
   * Get payments by walletId
   * @param walletId
   */
  getByWalletId(walletId: string): Promise<Payment[]>

  /**
   * Create a new payment
   * Doesn't use the payment id specified in the payment object, but generates a new one
   * @param payment The payment object
   * @returns The payment id
   */
  create(payment: Payment): Promise<string>

  /**
   * Update the payment
   * @param payment The payment object
   * @returns The updated payment object or null if the payment doesn't exist
   */
  update(payment: Payment): Promise<Payment | null>
}
