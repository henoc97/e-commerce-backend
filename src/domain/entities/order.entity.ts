import { User } from './user.entity';
import { Shop } from './shop.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItem } from './order-item.enttity';
import { Payment } from './payment.entity';
import { Refund } from './refund.entity';

/**
 * Represents an order placed by a user in a shop.
 * Contains information about the order items, status, total amount, and related payment and refund details.
 */
export class Order {
  /**
   * Unique identifier for the Order.
   */
  id: number;

  /**
   * Unique identifier for the User who placed the order.
   */
  userId: number;

  /**
   * The User who placed the order.
   */
  user: User;

  /**
   * Unique identifier for the Shop where the order was placed.
   */
  shopId: number;

  /**
   * The Shop where the order was placed.
   */
  shop: Shop;

  /**
   * List of items included in the Order.
   */
  items: OrderItem[];

  /**
   * Status of the Order (e.g., Pending, Shipped, Delivered).
   */
  status: OrderStatus;

  /**
   * Total amount for the Order.
   */
  totalAmount: number;

  /**
   * Unique identifier for the Payment associated with the Order.
   */
  paymentId?: string;

  /**
   * Tracking number for the Order shipment.
   */
  trackingNumber?: string;

  /**
   * Date and time when the Order was created.
   */
  createdAt: Date;

  /**
   * Date and time when the Order was last updated.
   */
  updatedAt: Date;

  /**
   * List of Payments associated with the Order.
   */
  payments?: Payment[];

  /**
   * List of Refunds associated with the Order.
   */
  refunds?: Refund[];

  /**
   * Creates a new Order instance.
   * @param id - Unique identifier for the Order.
   * @param userId - Unique identifier for the User who placed the order.
   * @param user - The User who placed the order.
   * @param shopId - Unique identifier for the Shop where the order was placed.
   * @param shop - The Shop where the order was placed.
   * @param items - List of items included in the Order.
   * @param status - Status of the Order.
   * @param totalAmount - Total amount for the Order.
   * @param paymentId - Unique identifier for the Payment associated with the Order.
   * @param trackingNumber - Tracking number for the Order shipment.
   * @param createdAt - Date and time when the Order was created.
   * @param updatedAt - Date and time when the Order was last updated.
   * @param Payments - List of Payments associated with the Order.
   * @param Refunds - List of Refunds associated with the Order.
   */
  constructor(
    id: number,
    userId: number,
    user: User,
    shopId: number,
    shop: Shop,
    items: OrderItem[] = [],
    status: OrderStatus,
    totalAmount: number,
    paymentId?: string,
    trackingNumber?: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    payments?: Payment[],
    refunds?: Refund[],
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.shopId = shopId;
    this.shop = shop;
    this.items = items;
    this.status = status;
    this.totalAmount = totalAmount;
    this.paymentId = paymentId;
    this.trackingNumber = trackingNumber;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.payments = payments;
    this.refunds = refunds;
  }
}
