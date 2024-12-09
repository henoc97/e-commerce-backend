import { Inject, Injectable } from '@nestjs/common';
import { NewsletterSubscription } from '../../domain/entities/newsletter-subscription.entity';
import { INewsletterSubscriptionRepository } from '../../domain/repositories/newsletter-subscription.repository';
import { NewsletterSubscriptionDTO } from '../../presentation/dtos/newsletter-subscription.dto';
import { fromNewsletterSubscriptionDTO } from '../helper/to-entity/to.newsletter-subscription.entity';

/**
 * Service class for managing newsletter subscriptions.
 * Implements business logic and interacts with the repository for CRUD operations.
 */
@Injectable()
export class NewsletterSubscriptionService {
  constructor(
    @Inject('INewsletterSubscriptionRepository')
    private readonly newsletterSubscriptionRepository: INewsletterSubscriptionRepository,
  ) { }

  /**
   * Creates a new newsletter subscription for a specific shop.
   * @param dto - The data transfer object containing subscription details.
   * @returns A promise that resolves to the created NewsletterSubscription.
   * @throws InternalServerErrorException if creation fails.
   */
  async createSubscription(
    dto: NewsletterSubscriptionDTO,
  ): Promise<NewsletterSubscription> {
    const subscription = fromNewsletterSubscriptionDTO(dto);
    return await this.newsletterSubscriptionRepository.create(subscription);
  }

  /**
   * Retrieves a subscription by its ID for a specific shop.
   * @param id - The unique ID of the subscription to retrieve.
   * @returns A promise that resolves to the NewsletterSubscription if found, otherwise null.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async getSubscriptionById(
    id: number,
  ): Promise<NewsletterSubscription | null> {
    return await this.newsletterSubscriptionRepository.getById(id);
  }

  /**
   * Updates an existing newsletter subscription.
   * @param id - The unique ID of the subscription to update.
   * @param updates - Partial subscription data to update.
   * @returns A promise that resolves to the updated NewsletterSubscription.
   * @throws InternalServerErrorException if update fails.
   */
  async updateSubscription(
    id: number,
    updates: Partial<NewsletterSubscriptionDTO>,
  ): Promise<NewsletterSubscription> {
    const updatedSubscription = fromNewsletterSubscriptionDTO(updates);
    return await this.newsletterSubscriptionRepository.update(
      id,
      updatedSubscription,
    );
  }

  /**
   * Deletes a subscription by its ID for a specific shop.
   * @param id - The unique ID of the subscription to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws InternalServerErrorException if deletion fails.
   */
  async deleteSubscription(id: number): Promise<boolean> {
    return await this.newsletterSubscriptionRepository.delete(id);
  }

  /**
   * Retrieves all newsletter subscriptions for a specific shop.
   * @param shopId - The ID of the shop.
   * @returns A promise that resolves to an array of NewsletterSubscription entities.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async listAllSubscriptions(
    shopId: number,
  ): Promise<NewsletterSubscription[]> {
    return await this.newsletterSubscriptionRepository.listAllByShop(shopId);
  }

  /**
   * Finds a subscription by its email address for a specific shop.
   * @param email - The email address of the subscriber.
   * @param shopId - The ID of the shop.
   * @returns A promise that resolves to the NewsletterSubscription if found, otherwise null.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async getSubscriptionByEmail(
    email: string,
    shopId: number,
  ): Promise<NewsletterSubscription | null> {
    return await this.newsletterSubscriptionRepository.getByEmailAndShop(
      email,
      shopId,
    );
  }

  /**
   * Checks if an email address is already subscribed for a specific shop.
   * @param email - The email address to check.
   * @param shopId - The ID of the shop.
   * @returns A promise that resolves to true if the email is already subscribed, otherwise false.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async isEmailSubscribed(email: string, shopId: number): Promise<boolean> {
    return await this.newsletterSubscriptionRepository.isSubscribed(email, shopId);
  }

  /**
   * Retrieves subscriptions that were created within a specified date range for a specific shop.
   * @param shopId - The ID of the shop.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of NewsletterSubscription entities created within the date range.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async getSubscriptionsByDateRange(
    shopId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<NewsletterSubscription[]> {
    return await this.newsletterSubscriptionRepository.getByDateRange(
      shopId,
      startDate,
      endDate,
    );
  }

  /**
   * Counts the total number of subscriptions for a specific shop.
   * @param shopId - The ID of the shop.
   * @returns A promise that resolves to the total count of NewsletterSubscription entities.
   * @throws InternalServerErrorException if counting fails.
   */
  async countTotalSubscriptions(shopId: number): Promise<number> {
    return await this.newsletterSubscriptionRepository.countAllForShop(shopId);
  }
}
