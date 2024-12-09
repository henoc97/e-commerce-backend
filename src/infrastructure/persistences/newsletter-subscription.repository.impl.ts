import { fromNewsletterSubscriptionPrisma } from '../../application/helper/from-prisma/to.newsletter-subscription.entity';
import { NewsletterSubscription } from '../../domain/entities/newsletter-subscription.entity';
import { INewsletterSubscriptionRepository } from '../../domain/repositories/newsletter-subscription.repository';
import prisma from '../../../prisma/prisma.service';

export class NewsletterSubscriptionRepository
  implements INewsletterSubscriptionRepository {

  /**
   * Creates a new newsletter subscription for a specific shop.
   * @param subscription The subscription entity to create.
   * @returns The created newsletter subscription.
   */
  async create(
    subscription: NewsletterSubscription,
  ): Promise<NewsletterSubscription> {
    try {
      const { id, ...data } = subscription;
      const result = await prisma.newsletterSubscription.create({
        data: data,
      });
      return fromNewsletterSubscriptionPrisma(result);
    } catch (error) {
      console.error('Error creating newsletter subscription:', error);
      throw error;
    }
  }

  /**
   * Retrieves a newsletter subscription by its ID and shop ID.
   * @param id The ID of the subscription.
   * @returns The subscription if found, otherwise null.
   */
  async getById(id: number): Promise<NewsletterSubscription | null> {
    try {
      const result = await prisma.newsletterSubscription.findUnique({
        where: {
          id,
        },
      });
      return fromNewsletterSubscriptionPrisma(result);
    } catch (error) {
      console.error(
        'Error retrieving newsletter subscription by ID and shop ID:',
        error,
      );
      throw error;
    }
  }

  /**
   * Updates a newsletter subscription by its ID and shop ID.
   * @param id The ID of the subscription.
   * @param updates Partial data to update the subscription.
   * @returns The updated subscription.
   */
  async update(
    id: number,
    updates: Partial<NewsletterSubscription>,
  ): Promise<NewsletterSubscription> {
    try {
      const result = await prisma.newsletterSubscription.update({
        where: {
          id,
        },
        data: updates,
      });
      return fromNewsletterSubscriptionPrisma(result);
    } catch (error) {
      console.error('Error updating newsletter subscription:', error);
      throw error;
    }
  }

  /**
   * Deletes a newsletter subscription by its ID and shop ID.
   * @param id The ID of the subscription.
   * @returns True if the subscription was deleted, false otherwise.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.newsletterSubscription.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      console.error('Error deleting newsletter subscription:', error);
      return false;
    }
  }

  /**
   * Lists all newsletter subscriptions for a specific shop.
   * @param shopId The ID of the shop.
   * @returns An array of all newsletter subscriptions for the shop.
   */
  async listAllByShop(shopId: number): Promise<NewsletterSubscription[]> {
    try {
      const result = await prisma.newsletterSubscription.findMany({
        where: {
          shopId,
        },
      });
      return result?.map(fromNewsletterSubscriptionPrisma);
    } catch (error) {
      console.error(
        'Error listing all newsletter subscriptions for shop:',
        error,
      );
      throw error;
    }
  }

  /**
   * Retrieves a newsletter subscription by email and shop ID.
   * @param email The email of the subscription.
   * @param shopId The ID of the shop.
   * @returns The subscription if found, otherwise null.
   */
  async getByEmailAndShop(
    email: string,
    shopId: number,
  ): Promise<NewsletterSubscription | null> {
    try {
      const result = await prisma.newsletterSubscription.findUnique({
        where: {
          email,
          shopId,
        },
      });
      return fromNewsletterSubscriptionPrisma(result);
    } catch (error) {
      console.error(
        'Error retrieving newsletter subscription by email and shop ID:',
        error,
      );
      throw error;
    }
  }

  /**
   * Checks if a newsletter subscription exists for the given email and shop ID.
   * @param email The email to check.
   * @param shopId The ID of the shop.
   * @returns True if the email is subscribed to the newsletter for the shop, false otherwise.
   */
  async isSubscribed(email: string, shopId: number): Promise<boolean> {
    try {
      const subscription = await this.getByEmailAndShop(email, shopId);
      return subscription ? subscription.isActive : false;
    } catch (error) {
      console.error('Error checking subscription status for shop:', error);
      throw error;
    }
  }

  /**
   * Retrieves newsletter subscriptions within a date range for a specific shop.
   * @param shopId The ID of the shop.
   * @param startDate The start date.
   * @param endDate The end date.
   * @returns An array of subscriptions within the date range for the shop.
   */
  async getByDateRange(
    shopId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<NewsletterSubscription[]> {
    try {
      const result = await prisma.newsletterSubscription.findMany({
        where: {
          shopId,
          subscribedAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return result?.map(fromNewsletterSubscriptionPrisma);
    } catch (error) {
      console.error(
        'Error retrieving subscriptions by date range for shop:',
        error,
      );
      throw error;
    }
  }

  /**
   * Counts all newsletter subscriptions for a specific shop.
   * @param shopId The ID of the shop.
   * @returns The total number of subscriptions for the shop.
   */
  async countAllForShop(shopId: number): Promise<number> {
    try {
      const count = await prisma.newsletterSubscription.count({
        where: {
          shopId,
        },
      });
      return count;
    } catch (error) {
      console.error('Error counting newsletter subscriptions for shop:', error);
      throw error;
    }
  }
}
