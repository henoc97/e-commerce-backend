import { Field } from '@nestjs/graphql';
import { RefundStatus } from 'src/domain/enums/refund-status.enum';
import { OrderOutput } from './order.output';

/**
 * Data Transfer Object for Refund.
 * Used for validating and transforming refund data in API requests and responses.
 */
export class RefunOutput {
  /**
   * Unique identifier for the refund.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the associated order.
   */
  @Field()
  orderId: number;

  /**
   * The order associated with this refund.
   */
  @Field(() => OrderOutput, { nullable: true })
  order?: OrderOutput;

  /**
   * Reason for the refund.
   * Provides the justification or cause for the refund request.
   */
  @Field()
  reason: string;

  /**
   * Amount of money to be refunded.
   * Represents the total amount to be returned to the customer.
   */
  @Field()
  amount: number;

  /**
   * Current status of the refund.
   * Indicates whether the refund is pending, completed, or rejected.
   */
  @Field(() => RefundStatus)
  status: RefundStatus;

  /**
   * The date and time when the refund was created.
   */
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  /**
   * Creates a new RefundOutput instance.
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
    order: OrderOutput,
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
