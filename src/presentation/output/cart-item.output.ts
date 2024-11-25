import { Field, ObjectType } from "@nestjs/graphql";
import { CartOutput } from "./cart.output";
import { ProductOutput } from "./product.output";
import { Type } from "class-transformer";

/**
 * Data Transfer Object for CartItem.
 * Used for validating and transforming data in API requests and responses.
 */
@ObjectType()
export class CartItemOutput {
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
   * Cart associated with the cart-item.
   */
  @Field(() => CartOutput, { nullable: true })
  @Type(() => CartOutput)
  cart?: CartOutput;

  /**
   * Unique identifier for the Product associated with this CartItem.
   */
  @Field()
  productId: number;

  /**
   * User associated with the address.
   */
  @Field(() => ProductOutput, { nullable: true })
  @Type(() => ProductOutput)
  product?: ProductOutput;

  /**
   * Quantity of the Product in the CartItem.
   * Must be a positive integer.
   */
  @Field()
  quantity: number;

  /**
   * Creates a new CartItemOutput instance.
   * @param cartId - Unique identifier for the Cart to which this item belongs.
   * @param productId - Unique identifier for the Product associated with this CartItem.
   * @param quantity - Quantity of the Product in the CartItem.
   * @param id - Unique identifier for the CartItem (optional).
   * @param cart - The Cart to which this item belongs (optional).
   * @param product - The Product associated with this CartItem (optional).
   */
  constructor(
    cartId?: number,
    productId?: number,
    quantity?: number,
    id?: number,
    cart?: CartOutput,
    product?: ProductOutput,
  ) {
    this.id = id;
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
    this.cart = cart;
    this.product = product;
  }
}
