import { NewsletterSubscription } from 'src/domain/entities/newsletter-subscription.entity';

/**
 * Converts a NewsletterSubscriptionPrisma to a NewsletterSubscription entity.
 * @param subscriptionPrisma - The NewsletterSubscriptionPrisma to convert.
 * @returns The corresponding NewsletterSubscription entity.
 */
export function fromNewsletterSubscriptionPrisma(
  subscriptionPrisma: any,
): NewsletterSubscription {
  return new NewsletterSubscription(
    subscriptionPrisma.id,
    subscriptionPrisma.email,
    subscriptionPrisma.subscribedAt,
  );
}
