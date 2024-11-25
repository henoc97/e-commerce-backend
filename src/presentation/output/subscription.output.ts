import { Field, ObjectType } from "@nestjs/graphql";
import { VendorOutput } from "./vendor.output";
import { Type } from "class-transformer"
/**
 * Data Transfer Object for Subscription.
 * Used for validating and transforming subscription data in API requests and responses.
 */
@ObjectType()
export class SubscriptionOutput {
  /**
   * Unique identifier for the subscription.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Name of the subscription plan (e.g., "Basic Plan", "Premium Plan").
   */
  @Field()
  name: string;

  /**
   * Optional description of the subscription plan.
   * Provides additional details about the features or benefits of the plan.
   */
  @Field({ nullable: true })
  description?: string;

  /**
   * Price of the subscription plan.
   * Represents the cost associated with the subscription.
   */
  @Field()
  price: number;

  /**
   * Duration of the subscription in days.
   * Defines the validity period of the subscription.
   */
  @Field()
  duration: number;

  /**
   * Optional list of vendors associated with this subscription.
   * Represents vendors that have subscribed to this plan.
   */
  @Field(() => [VendorOutput], { nullable: true })
  @Type(() => VendorOutput)
  vendors?: VendorOutput[];

  /**
   * The date and time when the subscription was created.
   */
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  /**
   * The date and time when the subscription was last updated.
   */
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  /**
   * Creates a new SubscriptionOutput instance.
   * @param id - Unique identifier for the subscription.
   * @param name - Name of the subscription plan.
   * @param price - Price of the subscription plan.
   * @param duration - Duration of the subscription in days.
   * @param description - (Optional) Description of the subscription plan.
   * @param vendors - (Optional) List of vendors associated with the subscription.
   * @param createdAt - (Optional) Date and time of subscription creation.
   * @param updatedAt - (Optional) Date and time of the last update.
   */
  constructor(
    id?: number,
    name?: string,
    price?: number,
    duration?: number,
    description?: string,
    vendors: VendorOutput[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.description = description;
    this.vendors = vendors;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
