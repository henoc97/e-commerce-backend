
import { Field, ObjectType } from '@nestjs/graphql';
import { OrderOutput } from './order.output';
import { ProductOutput } from './product.output';

/**
 * Data Transfer Object for OrderItem.
 * Used for validating and transforming data in API requests and responses.
 */
@ObjectType()
export class OrderItemOutput {
  /**
   * Unique identifier for the OrderItem.
   * Optional during creation, required for updates.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the Order to which this item belongs.
   * Must be an integer.
   */
  @Field()
  orderId: number;

  /**
   * The Order to which this item belongs.
   * Optional for input, included for output to provide context.
   */
  @Field(() => OrderOutput, { nullable: true })
  order?: OrderOutput;

  /**
   * Unique identifier for the Product that is included in this order item.
   * Must be an integer.
   */
  @Field()
  productId: number;

  /**
   * The Product that is included in this order item.
   * Optional for input, included for output to provide context.
   */
  @Field(() => ProductOutput, { nullable: true })
  product?: ProductOutput;

  /**
   * Quantity of the Product included in this order item.
   * Must be a positive number.
   */
  @Field()
  quantity: number;

  /**
   * Price of the Product at the time of the order.
   * Must be a positive number.
   */
  @Field()
  price: number;

  /**
   * Date and time of order-item creation.
   * Optional for input, included for output to provide context.
   */
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  /**
   * Creates a new OrderItemOutput instance.
   * @param orderId - Unique identifier for the Order to which this item belongs.
   * @param productId - Unique identifier for the Product that is included in this order item.
   * @param quantity - Quantity of the Product included in this order item.
   * @param price - Price of the Product at the time of the order.
   * @param id - Unique identifier for the OrderItem (optional).
   * @param order - The Order to which this item belongs (optional).
   * @param product - The Product that is included in this order item (optional).
   * @param createdAt - Date and time of order-item creation (optional).
   */
  constructor(
    orderId: number,
    productId: number,
    quantity: number,
    price: number,
    id?: number,
    order?: OrderOutput,
    product?: ProductOutput,
    createdAt?: Date,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.order = order;
    this.product = product;
    this.createdAt = createdAt;
  }
}
