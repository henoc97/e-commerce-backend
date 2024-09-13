import { Payment } from '../entities/payment.entity';
import { PaymentStatus } from '../enums/payment-status.enum';

/**
 * Repository interface for managing Payment entities.
 * Provides methods for CRUD operations, status management, and additional functionalities.
 */
export interface IPaymentRepository {
  /**
   * Creates a new payment record.
   * @param payment - The Payment entity to create.
   * @returns A promise that resolves to the created Payment.
   * @throws Error if creation fails.
   */
  create(payment: Payment): Promise<Payment>;

  /**
   * Retrieves a Payment by its unique ID.
   * @param id - The unique ID of the Payment.
   * @returns A promise that resolves to the Payment if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getById(id: number): Promise<Payment | null>;

  /**
   * Updates an existing Payment record.
   * @param id - The unique ID of the Payment.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated Payment.
   * @throws Error if update fails.
   */
  update(id: number, updates: Partial<Payment>): Promise<Payment>;

  /**
   * Deletes a Payment by its unique ID.
   * @param id - The unique ID of the Payment.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Retrieves all Payments associated with a specific Order.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to an array of Payments for the specified Order.
   * @throws Error if retrieval fails.
   */
  getByOrderId(orderId: number): Promise<Payment[]>;

  /**
   * Retrieves all Payments made using a specific method.
   * @param method - The payment method used (e.g., Stripe, PayPal).
   * @returns A promise that resolves to an array of Payments for the specified method.
   * @throws Error if retrieval fails.
   */
  getByMethod(method: string): Promise<Payment[]>;

  /**
   * Retrieves all Payments with a specific status.
   * @param status - The status of Payments to retrieve (e.g., SUCCESS, FAILED).
   * @returns A promise that resolves to an array of Payments with the specified status.
   * @throws Error if retrieval fails.
   */
  getByStatus(status: PaymentStatus): Promise<Payment[]>;

  /**
   * Retrieves Payments made within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of Payments within the specified date range.
   * @throws Error if retrieval fails.
   */
  getByDateRange(startDate: Date, endDate: Date): Promise<Payment[]>;

  /**
   * Retrieves the total amount of Payments made within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to the total amount of Payments in the date range.
   * @throws Error if retrieval fails.
   */
  getTotalAmountByDateRange(startDate: Date, endDate: Date): Promise<number>;

  /**
   * Retrieves the most recent Payment for a specific Order.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to the most recent Payment for the specified Order.
   * @throws Error if retrieval fails.
   */
  getMostRecentPaymentByOrderId(orderId: number): Promise<Payment | null>;

  /**
   * Retrieves Payments grouped by payment method.
   * @returns A promise that resolves to a map of payment methods to arrays of Payments.
   * @throws Error if retrieval fails.
   */
  getPaymentsGroupedByMethod(): Promise<Map<string, Payment[]>>;
}
