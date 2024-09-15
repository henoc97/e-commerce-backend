import { Injectable } from '@nestjs/common';
import { Subscription } from 'src/domain/entities/subscription.entity';
import { ISubscriptionRepository } from 'src/domain/repositories/subscription.repository';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';
import { fromSubscriptionDTO } from '../helper/to-entity/to.subscription.entity';
/**
 * Service class for managing subscription plans.
 * Implements business logic for subscription-related use cases.
 */
@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {}

  /**
   * Creates a new subscription.
   * @param subscriptionDto - The SubscriptionDTO object containing subscription details.
   * @returns The created Subscription entity.
   */
  async createSubscription(
    subscriptionDto: SubscriptionDTO,
  ): Promise<Subscription> {
    const subscription = fromSubscriptionDTO(subscriptionDto);
    return this.subscriptionRepository.create(subscription);
  }

  /**
   * Fetches a subscription by its ID.
   * @param id - Unique identifier for the subscription.
   * @returns The Subscription if found, otherwise null.
   */
  async getSubscriptionById(id: number): Promise<Subscription | null> {
    return this.subscriptionRepository.getById(id);
  }

  /**
   * Updates a subscription.
   * @param id - Unique identifier of the subscription to update.
   * @param updates - Partial fields to update.
   * @returns The updated Subscription entity.
   */
  async updateSubscription(
    id: number,
    updates: Partial<SubscriptionDTO>,
  ): Promise<Subscription> {
    const subscriptionUpdates = fromSubscriptionDTO(updates);

    return this.subscriptionRepository.update(id, subscriptionUpdates);
  }

  /**
   * Deletes a subscription by its ID.
   * @param id - Unique identifier of the subscription.
   * @returns A boolean indicating success of the operation.
   */
  async deleteSubscription(id: number): Promise<boolean> {
    return this.subscriptionRepository.remove(id);
  }

  /**
   * Fetches all subscriptions linked to a vendor.
   * @param vendorId - Vendor's unique identifier.
   * @returns Array of Subscriptions associated with the vendor.
   */
  async getSubscriptionsByVendor(vendorId: number): Promise<Subscription[]> {
    return this.subscriptionRepository.getByVendor(vendorId);
  }

  /**
   * Finds subscriptions within a price range.
   * @param minPrice - Minimum price.
   * @param maxPrice - Maximum price.
   * @returns Array of Subscriptions within the price range.
   */
  async getSubscriptionsByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Subscription[]> {
    return this.subscriptionRepository.getByPriceRange(minPrice, maxPrice);
  }

  /**
   * Fetches all active subscriptions.
   * @returns Array of currently active Subscriptions.
   */
  async getActiveSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.getActive();
  }

  /**
   * Fetches all expired subscriptions.
   * @returns Array of expired Subscription entities.
   */
  async getExpiredSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.getExpired();
  }

  /**
   * Retrieves subscriptions expiring within a certain period.
   * @param days - Number of days before expiration.
   * @returns Array of Subscriptions expiring within the period.
   */
  async getExpiringSubscriptions(days: number): Promise<Subscription[]> {
    return this.subscriptionRepository.getExpiringSoon(days);
  }

  /**
   * Fetches the most recently created subscription.
   * @returns The latest Subscription entity.
   */
  async getLatestSubscription(): Promise<Subscription> {
    return this.subscriptionRepository.getLatest();
  }

  /**
   * Counts the total number of subscriptions for a specific vendor.
   * @param vendorId - Vendor's unique identifier.
   * @returns The number of subscriptions linked to the vendor.
   */
  async countSubscriptionsByVendor(vendorId: number): Promise<number> {
    return this.subscriptionRepository.countByVendor(vendorId);
  }
}
