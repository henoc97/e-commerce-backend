import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { Currency } from 'src/domain/enums/currencies.enum';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input Type for Payment.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class PaymentInput {
  /**
   * Unique identifier for the Payment.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the Order associated with this payment.
   */
  @Field()
  orderId: number;

  /**
   * The method used for the payment (e.g., Stripe, PayPal, Bank Transfer).
   */
  @Field()
  method: string;

  /**
   * The status of the payment (e.g., SUCCESS, FAILED, PENDING).
   */
  @Field()
  status: PaymentStatus;

  /**
   * The amount of money that was paid.
   */
  @Field()
  amount: number;

  /**
   * Optional provider identifier used by the payment provider.
   * This can be used for tracking or referencing the transaction with the provider.
   */
  @Field()
  providerId?: string;

  /**
   * Optional metadata associated with the payment.
   * This can include any additional information or details provided by the payment provider.
   */
  @Field({ nullable: true })
  metadata?: string;

  /**
   * The currency of the payment.
   */
  @Field()
  currency: Currency;
}
