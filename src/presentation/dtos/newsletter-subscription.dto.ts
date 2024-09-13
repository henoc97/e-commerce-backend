import { IsEmail, IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

/**
 * Data Transfer Object for NewsletterSubscription.
 * Used for validating and transforming data in API requests and responses.
 */
export class NewsletterSubscriptionDTO {
  /**
   * Unique identifier for the subscription.
   * Optional during creation, required for updates.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Email address of the subscriber.
   * Must be a valid email format.
   */
  @IsEmail()
  @IsString()
  email: string;

  /**
   * The date and time when the subscription was created.
   * Must be in ISO date format.
   * Optional during creation, will be set automatically if not provided.
   */
  @IsDateString()
  @IsOptional()
  subscribedAt?: Date;

  /**
   * Creates a new NewsletterSubscriptionDTO instance.
   * @param email - Email address of the subscriber.
   * @param subscribedAt - (Optional) Date and time of subscription creation.
   * @param id - Unique identifier for the subscription (optional).
   */
  constructor(
    email: string,
    subscribedAt?: Date,
    id?: number
  ) {
    this.id = id;
    this.email = email;
    this.subscribedAt = subscribedAt;
  }
}
