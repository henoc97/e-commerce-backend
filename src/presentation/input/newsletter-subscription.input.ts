import { Field, InputType } from '@nestjs/graphql';

/**
 * Input Type for Newsletter Subscription.
 * Used for GraphQL mutations to handle subscription data.
 */
@InputType()
export class NewsletterSubscriptionInput {
  /**
   * Unique identifier for the subscription.
   * Optional during creation, required for updates.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Email address of the subscriber.
   * Must be a valid email format.
   */
  @Field()
  email: string;

  /**
   * The identifier of the shop associated with this subscription.
   */
  @Field()
  shopId: number;

  /**
   * Indicates whether the subscription is active or not.
   */
  @Field()
  isActive: boolean;
}
