import { Injectable } from '@nestjs/common';
import { NewsletterSubscription } from 'src/domain/entities/newsletter-subscription.entity';
import { INewsletterSubscriptionRepository } from 'src/domain/repositories/newsletter-subscription.repository';
import { NewsletterSubscriptionDTO } from 'src/presentation/dtos/newsletter-subscription.dto';
import { fromNewsletterSubscriptionDTO } from '../helper/to-entity/to.newsletter-subscription.entity';

/**
 * Service class for managing newsletter subscriptions.
 * Implements business logic and interacts with the repository for CRUD operations.
 */
@Injectable()
export class NewsletterSubscriptionService {
  constructor(
    private readonly newsletterSubscriptionRepository: INewsletterSubscriptionRepository,
  ) {}

  /**
   * Creates a new newsletter subscription.
   * @param dto - The data transfer object containing subscription details.
   * @returns A promise that resolves to the created NewsletterSubscription.
   */
  async createSubscription(
    dto: NewsletterSubscriptionDTO,
  ): Promise<NewsletterSubscription> {
    const subscription = fromNewsletterSubscriptionDTO(dto);
    return this.newsletterSubscriptionRepository.create(subscription);
  }

  /**
   * Retrieves a subscription by its ID.
   * @param id - The unique ID of the subscription to retrieve.
   * @returns A promise that resolves to the NewsletterSubscription if found, otherwise null.
   */
  async getSubscriptionById(
    id: number,
  ): Promise<NewsletterSubscription | null> {
    return this.newsletterSubscriptionRepository.getById(id);
  }

  /**
   * Updates an existing newsletter subscription.
   * @param id - The unique ID of the subscription to update.
   * @param updates - Partial subscription data to update.
   * @returns A promise that resolves to the updated NewsletterSubscription.
   */
  async updateSubscription(
    id: number,
    updates: Partial<NewsletterSubscriptionDTO>,
  ): Promise<NewsletterSubscription> {
    const updatedSubscription = fromNewsletterSubscriptionDTO(updates);
    return this.newsletterSubscriptionRepository.update(
      id,
      updatedSubscription,
    );
  }

  /**
   * Deletes a subscription by its ID.
   * @param id - The unique ID of the subscription to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteSubscription(id: number): Promise<boolean> {
    return this.newsletterSubscriptionRepository.delete(id);
  }

  /**
   * Retrieves all newsletter subscriptions.
   * @returns A promise that resolves to an array of NewsletterSubscription entities.
   */
  async listAllSubscriptions(): Promise<NewsletterSubscription[]> {
    return this.newsletterSubscriptionRepository.listAll();
  }

  /**
   * Finds a subscription by its email address.
   * @param email - The email address of the subscriber.
   * @returns A promise that resolves to the NewsletterSubscription if found, otherwise null.
   */
  async getSubscriptionByEmail(
    email: string,
  ): Promise<NewsletterSubscription | null> {
    return this.newsletterSubscriptionRepository.getByEmail(email);
  }

  /**
   * Checks if an email address is already subscribed.
   * @param email - The email address to check.
   * @returns A promise that resolves to true if the email is already subscribed, otherwise false.
   */
  async isEmailSubscribed(email: string): Promise<boolean> {
    return this.newsletterSubscriptionRepository.isSubscribed(email);
  }

  /**
   * Retrieves subscriptions that were created within a specified date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of NewsletterSubscription entities created within the date range.
   */
  async getSubscriptionsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<NewsletterSubscription[]> {
    return this.newsletterSubscriptionRepository.getByDateRange(
      startDate,
      endDate,
    );
  }

  /**
   * Counts the total number of subscriptions.
   * @returns A promise that resolves to the total count of NewsletterSubscription entities.
   */
  async countTotalSubscriptions(): Promise<number> {
    return this.newsletterSubscriptionRepository.countAll();
  }
}
