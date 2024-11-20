import { Field, InputType } from '@nestjs/graphql';
import { OrderStatus } from 'src/domain/enums/order-status.enum';

/**
 * Input Type for Order.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class OrderInput {
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
   * Unique identifier for the Shop where the order was placed.
   * Must be an integer.
   */
  @Field()
  shopId: number;

  /**
   * Status of the Order (e.g., Pending, Shipped, Delivered).
   * Must be a valid OrderStatus enum value.
   */
  @Field()
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
  @Field({ nullable: true })
  paymentId?: string;

  /**
   * Tracking number for the Order shipment.
   * Optional field.
   */
  @Field({ nullable: true })
  trackingNumber?: string;
}
