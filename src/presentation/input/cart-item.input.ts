import { Field, InputType } from "@nestjs/graphql";


/**
 * Input Type for CartItem.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class CartItemDTO {
  /**
   * Unique identifier for the CartItem.
   * Optional during creation, required for updates.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the Cart to which this item belongs.
   */
  @Field()
  cartId: number;

  /**
   * Unique identifier for the Product associated with this CartItem.
   */
  @Field()
  productId: number;

  /**
   * Quantity of the Product in the CartItem.
   * Must be a positive integer.
   */
  @Field()
  quantity: number;
}
