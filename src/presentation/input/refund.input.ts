import { Field, InputType } from '@nestjs/graphql';
import { RefundStatus } from '../../domain/enums/refund-status.enum';

/**
 * Input Type for Refund.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class RefundInput {
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
  @Field()
  status: RefundStatus;
}
