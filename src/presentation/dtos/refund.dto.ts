import { IsInt, IsString, IsNumber, IsEnum, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderDTO } from './order.dto';
import { RefundStatus } from 'src/domain/enums/refund-status.enum';

/**
 * Data Transfer Object for Refund.
 * Used for validating and transforming refund data in API requests and responses.
 */
export class RefundDTO {
  /**
   * Unique identifier for the refund.
   */
  @IsInt()
  id: number;

  /**
   * Unique identifier for the associated order.
   */
  @IsInt()
  orderId: number;

  /**
   * The order associated with this refund.
   */
  @ValidateNested()
  @Type(() => OrderDTO)
  order: OrderDTO;

  /**
   * Reason for the refund.
   * Provides the justification or cause for the refund request.
   */
  @IsString()
  reason: string;

  /**
   * Amount of money to be refunded.
   * Represents the total amount to be returned to the customer.
   */
  @IsNumber()
  amount: number;

  /**
   * Current status of the refund.
   * Indicates whether the refund is pending, completed, or rejected.
   */
  @IsEnum(RefundStatus)
  status: RefundStatus;

  /**
   * The date and time when the refund was created.
   */
  @IsDateString()
  createdAt: Date;

  /**
   * Creates a new RefundDTO instance.
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
    order: OrderDTO,
    reason: string,
    amount: number,
    status: RefundStatus,
    createdAt: Date = new Date()
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
