import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import { Currency } from '../../domain/enums/currencies.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { OrderOutput } from './order.output';
import { Type } from 'class-transformer';


/**
 * Représente l'objet de transfert de données pour un paiement.
 * Used for validation and transformation of payment data.
 */
@ObjectType()
export class PaymentOutput {
  /**
   * Unique identifier for the Payment.
   */
  @Field()
  id: number;

  /**
   * Unique identifier for the Order associated with this payment.
   */
  @Field()
  orderId: number;

  /**
   * The Order associated with this payment.
   * This is a nested object that will be validated separately.
   */
  @Field(() => OrderOutput, { nullable: true })
  @Type(() => OrderOutput)
  order: OrderOutput;

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
  @Field({ nullable: true })
  providerId?: string;

  /**
   * Optional metadata associated with the payment.
   * This can include any additional information or details provided by the payment provider.
   */
  @Field({ nullable: true }) // Spécification explicite du type JSON
  metadata?: string;

  /**
   * The currency of the payment.
   */
  @Field()
  currency: Currency;

  /**
   * The date and time when the payment was created.
   */
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  /**
   * Creates a new PaymentdOutput instance.
   * @param id - Unique identifier for the Payment.
   * @param orderId - Unique identifier for the Order.
   * @param order - The Order associated with this payment.
   * @param method - The payment method used.
   * @param status - The current status of the payment.
   * @param amount - The total amount paid.
   * @param currency - The currency of the payment.
   * @param providerId - (Optional) Provider identifier for the payment.
   * @param metadata - (Optional) Metadata related to the payment.
   * @param createdAt - (Optional) Date and time of payment creation.
   */
  constructor(
    id?: number,
    orderId?: number,
    order?: OrderOutput,
    method?: string,
    status?: PaymentStatus,
    amount?: number,
    currency?: Currency,
    providerId?: string,
    metadata?: any,
    createdAt: Date = new Date(),
  ) {
    this.id = id;
    this.orderId = orderId;
    this.order = order;
    this.method = method;
    this.status = status;
    this.amount = amount;
    this.providerId = providerId;
    this.metadata = metadata;
    this.currency = currency;
    this.createdAt = createdAt;
  }
}
