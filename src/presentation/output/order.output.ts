
import { Field, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from 'src/domain/enums/order-status.enum';
import { OrderItemOutput } from './order-item.output';
import { UserOutput } from './user.output';
import { ShopOutput } from './shop.output';
import { PaymentOutput } from './payment.output';
import { RefunOutput } from './refund.output';

/**
 * Data Transfer Object for Order.
 * Used for validating and transforming data in API requests and responses.
 */
@ObjectType()
export class OrderOutput {
  /**
   * Unique identifier for the Order.
   * Optional during creation, required for updates.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the User who placed the order.
   * Must be an integer.
   */
  @Field()
  userId: number;

  /**
   * The User who placed the order.
   * Optional for input, included for output to provide context.
   */
  @Field(() => UserOutput, { nullable: true })
  user?: UserOutput;

  /**
   * Unique identifier for the Shop where the order was placed.
   * Must be an integer.
   */
  @Field()
  shopId: number;

  /**
   * The Shop where the order was placed.
   * Optional for input, included for output to provide context.
   */
  @Field(() => ShopOutput, { nullable: true })
  shop?: ShopOutput;

  /**
   * List of items included in the Order.
   * Each item must follow the OrderItemOutput schema.
   */
  @Field(() => [OrderItemOutput], { nullable: true })
  items?: OrderItemOutput[];

  /**
   * Status of the Order (e.g., Pending, Shipped, Delivered).
   * Must be a valid OrderStatus enum value.
   */
  @Field(() => OrderStatus, { nullable: true })
  status: OrderStatus;

  /**
   * Total amount for the Order.
   * Must be a positive number.
   */
  @Field()
  totalAmount: number;

  /**
   * Unique identifier for the Payment associated with the Order.
   * Optional field.
   */
  @Field()
  paymentId?: string;

  /**
   * Tracking number for the Order shipment.
   * Optional field.
   */
  @Field()
  trackingNumber?: string;

  /**
   * Date and time when the Order was created.
   * Automatically set to the current date and time if not provided.
   */
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  /**
   * Date and time when the Order was last updated.
   * Automatically set to the current date and time if not provided.
   */
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  /**
   * List of Payments associated with the Order.
   * Each payment must follow the PaymentOutput schema.
   * Optional field.
   */
  @Field(() => [PaymentOutput], { nullable: true })
  payments?: PaymentOutput[];

  /**
   * List of Refunds associated with the Order.
   * Each refund must follow the RefundOutput schema.
   * Optional field.
   */
  @Field(() => [RefunOutput], { nullable: true })
  refunds?: RefunOutput[];

  /**
   * Creates a new OrderOutput instance.
   * @param id The ID of the Order
   * @param userId - Unique identifier for the User who placed the order.
   * @param shopId - Unique identifier for the Shop where the order was placed.
   * @param status - Status of the Order.
   * @param totalAmount - Total amount for the Order.
   * @param paymentId - Unique identifier for the Payment associated with the Order (optional).
   * @param trackingNumber - Tracking number for the Order shipment (optional).
   * @param createdAt - Date and time when the Order was created (optional).
   * @param updatedAt - Date and time when the Order was last updated (optional).
   * @param items - List of items included in the Order (optional).
   * @param user - The User who placed the order (optional).
   * @param shop - The Shop where the order was placed (optional).
   * @param payments - List of Payments associated with the Order (optional).
   * @param refunds - List of Refunds associated with the Order (optional).
   */
  constructor(
    userId: number,
    shopId: number,
    status: OrderStatus,
    totalAmount: number,
    id?: number,
    paymentId?: string,
    trackingNumber?: string,
    createdAt?: Date,
    updatedAt?: Date,
    items?: OrderItemOutput[],
    user?: UserOutput,
    shop?: ShopOutput,
    payments?: PaymentOutput[],
    refunds?: RefunOutput[],
  ) {
    this.id = id;
    this.userId = userId;
    this.shopId = shopId;
    this.status = status;
    this.totalAmount = totalAmount;
    this.paymentId = paymentId;
    this.trackingNumber = trackingNumber;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.items = items;
    this.user = user;
    this.shop = shop;
    this.payments = payments;
    this.refunds = refunds;
  }
}
