import { Field, InputType } from "@nestjs/graphql";


/**
 * Input Type for Cart.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class CartInput {
  /**
   * Unique identifier for the Cart.
   * Optional during creation, required for updates.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the User who owns the Cart.
   */
  @Field()
  userId: number;

  /**
   * Total price of the Cart.
   * Calculated by summing the prices of all items in the Cart.
   */
  @Field({ nullable: true })
  totalPrice: number = 0;

  @Field({ nullable: true })
  totalQuantity: number = 0;

  @Field({ nullable: true })
  estimatedShippingCost: number = 0;
}
