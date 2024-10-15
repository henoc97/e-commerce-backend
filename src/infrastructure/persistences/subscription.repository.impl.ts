import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { fromSubscriptionPrisma } from 'src/application/helper/from-prisma/to.subscription.entity';
import { Subscription } from 'src/domain/entities/subscription.entity';
import { ISubscriptionRepository } from 'src/domain/repositories/subscription.repository';

export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}
  /**
   * Creates a new subscription record in the database.
   * @param subscription - The subscription entity to be created.
   * @returns A promise that resolves to the created subscription.
   */
  async create(subscription: Subscription): Promise<Subscription> {
    try {
      const { id, vendors, ...data } = subscription;
      const createdSubscription = await this.prisma.subscription.create({
        data: data,
      });
      return fromSubscriptionPrisma(createdSubscription);
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Unable to create subscription.');
    }
  }

  /**
   * Fetches a subscription by its ID.
   * @param id - The unique identifier of the subscription.
   * @returns A promise that resolves to the subscription if found, or null.
   */
  async getById(id: number): Promise<Subscription | null> {
    try {
      const result = await this.prisma.subscription.findUnique({
        where: { id },
      });
      return fromSubscriptionPrisma(result);
    } catch (error) {
      console.error('Error fetching subscription by ID:', error);
      throw new Error('Unable to fetch subscription.');
    }
  }

  /**
   * Updates a subscription record by its ID.
   * @param id - The unique identifier of the subscription.
   * @param updates - Partial updates to be applied to the subscription.
   * @returns A promise that resolves to the updated subscription.
   */
  async update(
    id: number,
    updates: Partial<Subscription>,
  ): Promise<Subscription> {
    try {
      const { vendors, ...data } = updates;
      const result = await this.prisma.subscription.update({
        where: { id },
        data: data,
      });
      return fromSubscriptionPrisma(result);
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw new Error('Unable to update subscription.');
    }
  }

  /**
   * Deletes a subscription record by its ID.
   * @param id - The unique identifier of the subscription.
   * @returns A promise that resolves to a boolean indicating success or failure.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.subscription.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting subscription:', error);
      return false;
    }
  }

  /**
   * Fetches all subscriptions associated with a specific vendor.
   * @param vendorId - The vendor's unique identifier.
   * @returns A promise that resolves to an array of subscriptions.
   */
  async getByVendor(vendorId: number): Promise<Subscription[]> {
    try {
      const result = await this.prisma.subscription.findMany({
        where: { vendors: { some: { id: vendorId } } },
      });
      return result.map(fromSubscriptionPrisma);
    } catch (error) {
      console.error('Error fetching subscriptions by vendor:', error);
      throw new Error('Unable to fetch subscriptions.');
    }
  }

  /**
   * Fetches subscriptions within a specified price range.
   * @param minPrice - Minimum price of the subscription.
   * @param maxPrice - Maximum price of the subscription.
   * @returns A promise that resolves to an array of subscriptions.
   */
  async getByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Subscription[]> {
    try {
      const result = await this.prisma.subscription.findMany({
        where: {
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
      });
      return result.map(fromSubscriptionPrisma);
    } catch (error) {
      console.error('Error fetching subscriptions by price range:', error);
      throw new Error('Unable to fetch subscriptions.');
    }
  }

  /**
   * Fetches all active subscriptions.
   * @returns A promise that resolves to an array of active subscriptions.
   */
  async getActive(): Promise<Subscription[]> {
    try {
      const now = new Date();
      const result = await this.prisma.subscription.findMany({
        where: {
          createdAt: {
            lte: now,
          },
          updatedAt: {
            gte: now,
          },
        },
      });
      return result.map(fromSubscriptionPrisma);
    } catch (error) {
      console.error('Error fetching active subscriptions:', error);
      throw new Error('Unable to fetch active subscriptions.');
    }
  }

  /**
   * Fetches all expired subscriptions.
   * @returns A promise that resolves to an array of expired subscriptions.
   */
  async getExpired(): Promise<Subscription[]> {
    try {
      const now = new Date();
      const result = await this.prisma.subscription.findMany({
        where: {
          updatedAt: {
            lte: now,
          },
        },
      });
      return result.map(fromSubscriptionPrisma);
    } catch (error) {
      console.error('Error fetching expired subscriptions:', error);
      throw new Error('Unable to fetch expired subscriptions.');
    }
  }

  /**
   * Fetches subscriptions that are expiring soon (within the specified number of days).
   * @param days - The number of days until the subscription expires.
   * @returns A promise that resolves to an array of subscriptions.
   */
  async getExpiringSoon(days: number): Promise<Subscription[]> {
    try {
      const now = new Date();
      const expiringDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000); // days in milliseconds
      const result = await this.prisma.subscription.findMany({
        where: {
          updatedAt: {
            gte: now,
            lte: expiringDate,
          },
        },
      });
      return result.map(fromSubscriptionPrisma);
    } catch (error) {
      console.error('Error fetching expiring subscriptions:', error);
      throw new Error('Unable to fetch expiring subscriptions.');
    }
  }

  /**
   * Fetches the most recently created subscription.
   * @returns A promise that resolves to the latest subscription.
   */
  async getLatest(): Promise<Subscription> {
    try {
      const result = await this.prisma.subscription.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return fromSubscriptionPrisma(result);
    } catch (error) {
      console.error('Error fetching the latest subscription:', error);
      throw new Error('Unable to fetch latest subscription.');
    }
  }

  /**
   * Counts the total number of subscriptions for a specific vendor.
   * @param vendorId - The vendor's unique identifier.
   * @returns A promise that resolves to the count of subscriptions.
   */
  async countByVendor(vendorId: number): Promise<number> {
    try {
      return await this.prisma.subscription.count({
        where: { vendors: { some: { id: vendorId } } },
      });
    } catch (error) {
      console.error('Error counting subscriptions by vendor:', error);
      throw new Error('Unable to count subscriptions.');
    }
  }
}
