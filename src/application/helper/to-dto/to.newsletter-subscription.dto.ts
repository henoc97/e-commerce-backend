import { NewsletterSubscriptionDTO } from '../../../presentation/dtos/newsletter-subscription.dto';

/**
 * Converts a NewsletterSubscription entity to NewsletterSubscriptionDTO.
 * @param subscription - The NewsletterSubscription entity to convert.
 * @returns The corresponding NewsletterSubscriptionDTO.
 */
export function toNewsletterSubscriptionDTO(
  subscription: any,
): NewsletterSubscriptionDTO {
  return new NewsletterSubscriptionDTO(
    subscription.email,
    subscription.shopId,
    subscription.isActive,
    subscription.subscribedAt,
    subscription.id,
  );
}
