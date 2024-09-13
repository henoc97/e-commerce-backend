import {
  IsInt,
  IsNumber,
  IsOptional,
  IsEnum,
  IsString,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { OrderItemDTO } from './order-item.dto';
import { Type } from 'class-transformer';
import { UserDTO } from './user.dto';
import { PaymentDTO } from './payment.dto';
import { RefundDTO } from './refund.dto';
import { ShopDTO } from './shop.dto';
import { OrderStatus } from 'src/domain/enums/order-status.enum';

/**
 * Data Transfer Object for Order.
 * Used for validating and transforming data in API requests and responses.
 */
export class OrderDTO {
  /**
   * Unique identifier for the Order.
   * Optional during creation, required for updates.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Unique identifier for the User who placed the order.
   * Must be an integer.
   */
  @IsInt()
  userId: number;

  /**
   * The User who placed the order.
   * Optional for input, included for output to provide context.
   */
  @IsOptional()
  user?: UserDTO;

  /**
   * Unique identifier for the Shop where the order was placed.
   * Must be an integer.
   */
  @IsInt()
  shopId: number;

  /**
   * The Shop where the order was placed.
   * Optional for input, included for output to provide context.
   */
  @IsOptional()
  shop?: ShopDTO;

  /**
   * List of items included in the Order.
   * Each item must follow the OrderItemDTO schema.
   */
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  @IsOptional()
  items?: OrderItemDTO[];

  /**
   * Status of the Order (e.g., Pending, Shipped, Delivered).
   * Must be a valid OrderStatus enum value.
   */
  @IsEnum(OrderStatus)
  status: OrderStatus;

  /**
   * Total amount for the Order.
   * Must be a positive number.
   */
  @IsNumber()
  totalAmount: number;

  /**
   * Unique identifier for the Payment associated with the Order.
   * Optional field.
   */
  @IsString()
  @IsOptional()
  paymentId?: string;

  /**
   * Tracking number for the Order shipment.
   * Optional field.
   */
  @IsString()
  @IsOptional()
  trackingNumber?: string;

  /**
   * Date and time when the Order was created.
   * Automatically set to the current date and time if not provided.
   */
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  /**
   * Date and time when the Order was last updated.
   * Automatically set to the current date and time if not provided.
   */
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  /**
   * List of Payments associated with the Order.
   * Each payment must follow the PaymentDTO schema.
   * Optional field.
   */
  @ValidateNested({ each: true })
  @Type(() => PaymentDTO)
  @IsOptional()
  payments?: PaymentDTO[];

  /**
   * List of Refunds associated with the Order.
   * Each refund must follow the RefundDTO schema.
   * Optional field.
   */
  @ValidateNested({ each: true })
  @Type(() => RefundDTO)
  @IsOptional()
  refunds?: RefundDTO[];

  /**
   * Creates a new OrderDTO instance.
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
    paymentId?: string,
    trackingNumber?: string,
    createdAt?: Date,
    updatedAt?: Date,
    items?: OrderItemDTO[],
    user?: UserDTO,
    shop?: ShopDTO,
    payments?: PaymentDTO[],
    refunds?: RefundDTO[],
  ) {
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
