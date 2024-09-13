/**
 * Represents a subscription to a newsletter.
 * Stores details about the subscriber's email and the subscription date.
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
   * Creates a new NewsletterSubscription instance.
   * @param id - Unique identifier for the subscription.
   * @param email - Email address of the subscriber.
   * @param subscribedAt - (Optional) Date and time of subscription creation.
   */
  constructor(id: number, email: string, subscribedAt: Date = new Date()) {
    this.id = id;
    this.email = email;
    this.subscribedAt = subscribedAt;
  }
}
