import { Field, ObjectType } from "@nestjs/graphql";


/**
 * Data Transfer Object for NewsletterSubscription.
 * Used for validating and transforming data in API requests and responses.
 */
@ObjectType()
export class NewsletterSubscriptionDTO {
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

  /**
   * The date and time when the subscription was created.
   * Must be in ISO date format.
   * Optional during creation, will be set automatically if not provided.
   */
  @Field(() => Date, { nullable: true })
  subscribedAt?: Date;

  /**
   * Creates a new NewsletterSubscriptionDTO instance.
   * @param email - Email address of the subscriber.
   * @param shopId - Identifier of the associated shop.
   * @param isActive - Status of the subscription (active/inactive). Default is `true`.
   * @param subscribedAt - (Optional) Date and time of subscription creation.
   * @param id - Unique identifier for the subscription (optional).
   */
  constructor(
    email: string,
    shopId: number,
    isActive: boolean,
    subscribedAt?: Date,
    id?: number,
  ) {
    this.id = id;
    this.email = email;
    this.shopId = shopId;
    this.isActive = isActive;
    this.subscribedAt = subscribedAt;
  }
}
