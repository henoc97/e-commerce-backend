import { NewsletterSubscription } from '../entities/newsletter-subscription.entity';

/**
 * Repository interface for managing newsletter subscriptions.
 * Defines operations for CRUD and business-specific functionalities related to subscriptions.
 */
export interface INewsletterSubscriptionRepository {
  /**
   * Creates a new newsletter subscription for a specific shop.
   * @param subscription - The subscription entity to create.
   * @returns A promise that resolves to the created NewsletterSubscription.
   * @throws Error if creation fails.
   */
  create(subscription: NewsletterSubscription): Promise<NewsletterSubscription>;

  /**
   * Retrieves a subscription by its unique ID and shop ID.
   * @param id - The unique ID of the subscription.
   * @returns A promise that resolves to the NewsletterSubscription if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getById(id: number): Promise<NewsletterSubscription | null>;

  /**
   * Updates an existing newsletter subscription for a specific shop.
   * @param id - The unique ID of the subscription.
   * @param updates - Partial subscription data to update.
   * @returns A promise that resolves to the updated NewsletterSubscription.
   * @throws Error if update fails.
   */
  update(
    id: number,
    updates: Partial<NewsletterSubscription>,
  ): Promise<NewsletterSubscription>;

  /**
   * Deletes a subscription by its unique ID and shop ID.
   * @param id - The unique ID of the subscription.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Retrieves all newsletter subscriptions for a specific shop.
   * @param shopId - The ID of the shop.
   * @returns A promise that resolves to an array of NewsletterSubscription entities.
   * @throws Error if retrieval fails.
   */
  listAllByShop(shopId: number): Promise<NewsletterSubscription[]>;

  /**
   * Finds a subscription by its email address and shop ID.
   * @param email - The email address of the subscriber.
   * @param shopId - The ID of the shop.
   * @returns A promise that resolves to the NewsletterSubscription if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getByEmailAndShop(
    email: string,
    shopId: number,
  ): Promise<NewsletterSubscription | null>;

  /**
   * Checks if an email address is already subscribed for a specific shop.
   * @param email - The email address to check.
   * @param shopId - The ID of the shop.
   * @returns A promise that resolves to true if the email is already subscribed, otherwise false.
   * @throws Error if the check fails.
   */
  isSubscribed(email: string, shopId: number): Promise<boolean>;

  /**
   * Retrieves subscriptions that were created within a specified date range for a specific shop.
   * @param shopId - The ID of the shop.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of NewsletterSubscription entities created within the date range.
   * @throws Error if retrieval fails.
   */
  getByDateRange(
    shopId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<NewsletterSubscription[]>;

  /**
   * Counts the total number of subscriptions for a specific shop.
   * @param shopId - The ID of the shop.
   * @returns A promise that resolves to the total count of NewsletterSubscription entities.
   * @throws Error if counting fails.
   */
  countAllForShop(shopId: number): Promise<number>;
}
