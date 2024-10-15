/**
 * Represents a subscription to a newsletter.
 * Stores details about the subscriber's email, the subscription date, the associated shop, and the subscription status.
 */
export class NewsletterSubscription {
  /**
   * Unique identifier for the subscription.
   */
  id: number;

  /**
   * Email address of the subscriber.
   */
  email: string;

  /**
   * The date and time when the subscription was created.
   * Automatically set to the current date and time when a subscription is created.
   */
  subscribedAt: Date;

  /**
   * The identifier of the shop associated with this subscription.
   */
  shopId: number;

  /**
   * Indicates whether the subscription is active or not.
   */
  isActive: boolean;

  /**
   * Creates a new NewsletterSubscription instance.
   * @param id - Unique identifier for the subscription.
   * @param email - Email address of the subscriber.
   * @param shopId - Identifier of the associated shop.
   * @param isActive - Status of the subscription (active/inactive). Default is `true`.
   * @param subscribedAt - Date and time of subscription creation.
   */
  constructor(
    id: number,
    email: string,
    shopId: number,
    isActive: boolean = true,
    subscribedAt: Date = new Date(),
  ) {
    this.id = id;
    this.email = email;
    this.shopId = shopId;
    this.isActive = isActive;
    this.subscribedAt = subscribedAt;
  }
}
