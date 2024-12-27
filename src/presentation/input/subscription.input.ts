import { InputType, Field } from "@nestjs/graphql";
import { Currency } from "../../domain/enums/currencies.enum";

/**
 * Input Type for Subscription.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class SubscriptionInput {
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

  @Field()
  currency: Currency;



  /**
   * Duration of the subscription in days.
   * Defines the validity period of the subscription.
   */
  @Field()
  duration: number;
}
