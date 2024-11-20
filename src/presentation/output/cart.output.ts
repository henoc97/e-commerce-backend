import { Field, ObjectType } from '@nestjs/graphql';
import { CartItemOutput } from './cart-item.output';
import { UserOutput } from './user.output';

/**
 * Data Transfer Object for Cart.
 * Used for validating and transforming data in API requests and responses.
 */
@ObjectType()
export class CartOutput {
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
   * User associated with the address.
   */
  @Field(() => UserOutput, { nullable: true })
  user?: UserOutput;

  /**
   * Items in the Cart.
   * Validates each item using the CartItemOutput.
   * Optional during creation.
   */
  @Field(() => [CartItemOutput], { nullable: true })
  items?: CartItemOutput[];

  /**
   * Total price of the Cart.
   * Calculated by summing the prices of all items in the Cart.
   */
  @Field()
  totalPrice: number;

  @Field()
  totalQuantity: number;

  @Field()
  estimatedShippingCost: number;

  @Field(() => Date, { nullable: true })
  lastSaved?: Date;

  /**
   * Creates a new CartOutput instance.
   * @param userId - Unique identifier for the User who owns the Cart.
   * @param totalPrice
   * @param totalQuantity
   * @param estimatedShippingCost
   * @param lastSaved
   * @param id - Unique identifier for the Cart (optional).
   * @param items - Items in the Cart (optional).
   * @param user - The User who owns the Cart (optional).
   */
  constructor(
    userId: number,
    totalPrice: number,
    totalQuantity: number,
    estimatedShippingCost: number,
    lastSaved: Date,
    id?: number,
    items?: CartItemOutput[],
    user?: UserOutput,
  ) {
    this.id = id;
    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;
    this.estimatedShippingCost = estimatedShippingCost;
    this.lastSaved = lastSaved;
    this.userId = userId;
    this.user = user;
    this.items = items;
  }
}
