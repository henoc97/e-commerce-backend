import { RefundStatus } from '../enums/refund-status.enum';
import { Order } from './order.entity';

/**
 * Represents a refund associated with an order.
 * Stores details about the refund, including the reason, amount, and status.
 */
export class Refund {
  /**
   * Unique identifier for the refund.
   */
  id: number;

  /**
   * Unique identifier for the associated order.
   */
  orderId: number;

  /**
   * The order associated with this refund.
   */
  order: Order;

  /**
   * Reason for the refund.
   * Provides the justification or cause for the refund request.
   */
  reason: string;

  /**
   * Amount of money to be refunded.
   * Represents the total amount to be returned to the customer.
   */
  amount: number;

  /**
   * Current status of the refund.
   * Indicates whether the refund is pending, completed, or rejected.
   */
  status: RefundStatus;

  /**
   * The date and time when the refund was created.
   * Automatically set to the current date and time when the refund is created.
   */
  createdAt: Date;

  /**
   * Creates a new Refund instance.
   * @param id - Unique identifier for the refund.
   * @param orderId - Unique identifier for the associated order.
   * @param order - The order related to the refund.
   * @param reason - Reason for the refund.
   * @param amount - Amount of money to be refunded.
   * @param status - Current status of the refund.
   * @param createdAt - (Optional) Date and time of refund creation.
   */
  constructor(
    id: number,
    orderId: number,
    order: Order,
    reason: string,
    amount: number,
    status: RefundStatus,
    createdAt: Date = new Date(),
  ) {
    this.id = id;
    this.orderId = orderId;
    this.order = order;
    this.reason = reason;
    this.amount = amount;
    this.status = status;
    this.createdAt = createdAt;
  }
}
