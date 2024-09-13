import { PaymentStatus } from '../enums/payment-status.enum';
import { Order } from './order.entity';

/**
 * Represents a payment made for an order.
 * Stores details about the payment method, status, amount, and other related information.
 */
export class Payment {
  /**
   * Unique identifier for the Payment.
   */
  id: number;

  /**
   * Unique identifier for the Order associated with this payment.
   */
  orderId: number;

  /**
   * The Order associated with this payment.
   */
  order: Order;

  /**
   * The method used for the payment (e.g., Stripe, PayPal, Bank Transfer).
   */
  method: string;

  /**
   * The status of the payment (e.g., SUCCESS, FAILED, PENDING).
   */
  status: PaymentStatus;

  /**
   * The amount of money that was paid.
   */
  amount: number;

  /**
   * Optional provider identifier used by the payment provider.
   * This can be used for tracking or referencing the transaction with the provider.
   */
  providerId?: string;

  /**
   * Optional metadata associated with the payment.
   * This can include any additional information or details provided by the payment provider.
   */
  metadata?: any;

  /**
   * The date and time when the payment was created.
   * Automatically set to the current date and time when a Payment is created.
   */
  createdAt: Date;

  /**
   * Creates a new Payment instance.
   * @param id - Unique identifier for the Payment.
   * @param orderId - Unique identifier for the Order.
   * @param order - The Order associated with this payment.
   * @param method - The payment method used.
   * @param status - The current status of the payment.
   * @param amount - The total amount paid.
   * @param providerId - (Optional) Provider identifier for the payment.
   * @param metadata - (Optional) Metadata related to the payment.
   * @param createdAt - (Optional) Date and time of payment creation.
   */
  constructor(
    id: number,
    orderId: number,
    order: Order,
    method: string,
    status: PaymentStatus,
    amount: number,
    providerId?: string,
    metadata?: any,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.orderId = orderId;
    this.order = order;
    this.method = method;
    this.status = status;
    this.amount = amount;
    this.providerId = providerId;
    this.metadata = metadata;
    this.createdAt = createdAt;
  }
}
