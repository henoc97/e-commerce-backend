import { fromVendorPrisma } from './to.vendor.entity';
import { Subscription } from '../../../domain/entities/subscription.entity';

/**
 * Converts a SubscriptionPrisma to a Subscription entity.
 * @param subscriptionPrisma - The SubscriptionPrisma to convert.
 * @returns The corresponding Subscription entity.
 */
export function fromSubscriptionPrisma(subscriptionPrisma: any): Subscription {
  return new Subscription(
    subscriptionPrisma.id,
    subscriptionPrisma.name,
    subscriptionPrisma.price,
    subscriptionPrisma.currency,
    subscriptionPrisma.duration,
    subscriptionPrisma.description,
    subscriptionPrisma.vendors?.map((vendorPrisma: any) =>
      fromVendorPrisma(vendorPrisma),
    ) || [],
    new Date(subscriptionPrisma.createdAt),
    new Date(subscriptionPrisma.updatedAt),
  );
}
