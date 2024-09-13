import { Subscription } from '../entities/subscription.entity';

/**
 * Interface for managing subscription plans,
 * defining business rules and CRUD operations.
 */
export interface ISubscriptionRepository {
  /**
   * Creates a new subscription.
   * @param subscription - The Subscription object to be created.
   * @returns The created Subscription entity.
   */
  create(subscription: Subscription): Promise<Subscription>;

  /**
   * Fetches a subscription by its ID.
   * @param id - Unique identifier for the subscription.
   * @returns The Subscription if found, otherwise null.
   */
  getById(id: number): Promise<Subscription | null>;

  /**
   * Updates a subscription.
   * @param id - Unique identifier of the subscription to update.
   * @param updates - Fields to update.
   * @returns The updated Subscription entity.
   */
  update(id: number, updates: Partial<Subscription>): Promise<Subscription>;

  /**
   * Deletes a subscription by its ID.
   * @param id - Unique identifier of the subscription.
   * @returns A boolean indicating success of the operation.
   */
  remove(id: number): Promise<boolean>;

  /**
   * Fetches all subscriptions linked to a vendor.
   * @param vendorId - Vendor's unique identifier.
   * @returns Array of Subscriptions associated with the vendor.
   */
  getByVendor(vendorId: number): Promise<Subscription[]>;

  /**
   * Finds subscriptions within a price range.
   * @param minPrice - Minimum price.
   * @param maxPrice - Maximum price.
   * @returns Array of Subscriptions within the price range.
   */
  getByPriceRange(minPrice: number, maxPrice: number): Promise<Subscription[]>;

  /**
   * Fetches all active subscriptions.
   * @returns Array of currently active Subscriptions.
   */
  getActive(): Promise<Subscription[]>;

  /**
   * Fetches all expired subscriptions.
   * @returns Array of expired Subscription entities.
   */
  getExpired(): Promise<Subscription[]>;

  /**
   * Retrieves subscriptions expiring within a certain period.
   * @param days - Number of days before expiration.
   * @returns Array of Subscriptions expiring within the period.
   */
  getExpiringSoon(days: number): Promise<Subscription[]>;

  /**
   * Fetches the most recently created subscription.
   * @returns The latest Subscription entity.
   */
  getLatest(): Promise<Subscription>;

  /**
   * Counts the total number of subscriptions for a specific vendor.
   * @param vendorId - Vendor's unique identifier.
   * @returns The number of subscriptions linked to the vendor.
   */
  countByVendor(vendorId: number): Promise<number>;
}
