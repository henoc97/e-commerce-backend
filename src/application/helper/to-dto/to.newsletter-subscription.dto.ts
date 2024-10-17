import { NewsletterSubscription } from 'src/domain/entities/newsletter-subscription.entity';
import { NewsletterSubscriptionDTO } from 'src/presentation/dtos/newsletter-subscription.dto';

/**
 * Converts a NewsletterSubscription entity to NewsletterSubscriptionDTO.
 * @param subscription - The NewsletterSubscription entity to convert.
 * @returns The corresponding NewsletterSubscriptionDTO.
 */
export function toNewsletterSubscriptionDTO(
  subscription: NewsletterSubscription,
): NewsletterSubscriptionDTO {
  return new NewsletterSubscriptionDTO(
    subscription.email,
    subscription.shopId,
    subscription.isActive,
    subscription.subscribedAt,
    subscription.id,
  );
}
