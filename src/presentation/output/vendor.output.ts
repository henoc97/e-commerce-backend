import { Field, ObjectType } from "@nestjs/graphql";
import { ProductOutput } from "./product.output";
import { SubscriptionOutput } from "./subscription.output";
import { ShopOutput } from "./shop.output";
import { UserOutput } from "./user.output";


/**
 * Data Transfer Object for Vendor.
 * Used for validating and transforming vendor data in API requests and responses.
 */
@ObjectType()
export class VendorOutput {
  /**
   * Unique identifier for the vendor.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Identifier of the user associated with the vendor.
   */
  @Field()
  userId: number;

  /**
   * User associated with the vendor.
   */
  @Field(() => UserOutput, { nullable: true })
  user: UserOutput;

  /**
   * Name of the vendor's store.
   */
  @Field()
  storeName: string;

  /**
   * Optional list of products associated with the vendor.
   */
  @Field(() => [ProductOutput], { nullable: true })
  products?: ProductOutput[];

  /**
   * Optional subscription associated with the vendor.
   */
  @Field(() => SubscriptionOutput, { nullable: true })
  subscription?: SubscriptionOutput;

  /**
   * Optional ID of the subscription.
   */
  @Field()
  subscriptionId?: number;

  /**
   * Optional shop associated with the vendor.
   */
  @Field(() => ShopOutput, { nullable: true })
  shop?: ShopOutput;

  /**
   * Creates a new VendorOutput instance.
   * @param id - The unique identifier for the vendor.
   * @param userId - The ID of the user associated with the vendor.
   * @param user - The user associated with the vendor.
   * @param storeName - The name of the vendor's store.
   * @param products - Optional array of products associated with the vendor.
   * @param subscriptionId - Optional ID of the subscription.
   * @param subscription - Optional subscription associated with the vendor.
   * @param shop - Optional shop associated with the vendor.
   */
  constructor(
    id: number,
    userId: number,
    user: UserOutput,
    storeName: string,
    products?: ProductOutput[],
    subscriptionId?: number,
    subscription?: SubscriptionOutput,
    shop?: ShopOutput,
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.storeName = storeName;
    this.products = products;
    this.subscription = subscription;
    this.subscriptionId = subscriptionId;
    this.shop = shop;
  }
}
