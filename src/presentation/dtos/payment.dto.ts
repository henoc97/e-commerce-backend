import {
  IsInt,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderDTO } from './order.dto';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';

/**
 * Represents the data transfer object for a payment.
 * Used for validation and transformation of payment data.
 */
export class PaymentDTO {
  /**
   * Unique identifier for the Payment.
   */
  @IsInt()
  id: number;

  /**
   * Unique identifier for the Order associated with this payment.
   */
  @IsInt()
  orderId: number;

  /**
   * The Order associated with this payment.
   * This is a nested object that will be validated separately.
   */
  @ValidateNested()
  @Type(() => OrderDTO)
  order: OrderDTO;

  /**
   * The method used for the payment (e.g., Stripe, PayPal, Bank Transfer).
   */
  @IsString()
  method: string;

  /**
   * The status of the payment (e.g., SUCCESS, FAILED, PENDING).
   */
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  /**
   * The amount of money that was paid.
   */
  @IsNumber()
  amount: number;

  /**
   * Optional provider identifier used by the payment provider.
   * This can be used for tracking or referencing the transaction with the provider.
   */
  @IsOptional()
  @IsString()
  providerId?: string;

  /**
   * Optional metadata associated with the payment.
   * This can include any additional information or details provided by the payment provider.
   */
  @IsOptional()
  @Type(() => Object) // Assuming metadata is an object. Adjust if needed.
  metadata?: any;

  /**
   * The date and time when the payment was created.
   */
  @IsDate()
  createdAt: Date;

  /**
   * Creates a new PaymentDTO instance.
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
    order: OrderDTO,
    method: string,
    status: PaymentStatus,
    amount: number,
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
    this.createdAt = createdAt;
  }
}
