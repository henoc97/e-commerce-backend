import { Field, InputType } from "@nestjs/graphql";


/**
 * Input Type for OrderItem.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class OrderItemInput {
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
   * Unique identifier for the Product that is included in this order item.
   * Must be an integer.
   */
  @Field()
  productId: number;

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
}
