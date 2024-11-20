import { InputType, Field } from "@nestjs/graphql";

/**
 * Input Type for Subscription.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class SubscriptionDTO {
  /**
   * Unique identifier for the subscription.
   */
  @Field()
  id: number;

  /**
   * Name of the subscription plan (e.g., "Basic Plan", "Premium Plan").
   */
  @Field()
  name: string;

  /**
   * Optional description of the subscription plan.
   * Provides additional details about the features or benefits of the plan.
   */
  @Field()
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
}
