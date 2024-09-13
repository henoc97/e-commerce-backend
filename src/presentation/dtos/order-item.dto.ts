import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { OrderDTO } from './order.dto';
import { ProductDTO } from './product.dto';


/**
 * Data Transfer Object for OrderItem.
 * Used for validating and transforming data in API requests and responses.
 */
export class OrderItemDTO {
  /**
   * Unique identifier for the OrderItem.
   * Optional during creation, required for updates.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Unique identifier for the Order to which this item belongs.
   * Must be an integer.
   */
  @IsInt()
  orderId: number;

  /**
   * The Order to which this item belongs.
   * Optional for input, included for output to provide context.
   */
  @IsOptional()
  order?: OrderDTO;

  /**
   * Unique identifier for the Product that is included in this order item.
   * Must be an integer.
   */
  @IsInt()
  productId: number;

  /**
   * The Product that is included in this order item.
   * Optional for input, included for output to provide context.
   */
  @IsOptional()
  product?: ProductDTO;

  /**
   * Quantity of the Product included in this order item.
   * Must be a positive number.
   */
  @IsNumber()
  quantity: number;

  /**
   * Price of the Product at the time of the order.
   * Must be a positive number.
   */
  @IsNumber()
  price: number;

  /**
   * Creates a new OrderItemDTO instance.
   * @param orderId - Unique identifier for the Order to which this item belongs.
   * @param productId - Unique identifier for the Product that is included in this order item.
   * @param quantity - Quantity of the Product included in this order item.
   * @param price - Price of the Product at the time of the order.
   * @param id - Unique identifier for the OrderItem (optional).
   * @param order - The Order to which this item belongs (optional).
   * @param product - The Product that is included in this order item (optional).
   */
  constructor(
    orderId: number,
    productId: number,
    quantity: number,
    price: number,
    id?: number,
    order?: OrderDTO,
    product?: ProductDTO
  ) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.order = order;
    this.product = product;
  }
}
