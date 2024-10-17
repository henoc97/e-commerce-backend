import { NewsletterSubscription } from 'src/domain/entities/newsletter-subscription.entity';
import { NewsletterSubscriptionDTO } from 'src/presentation/dtos/newsletter-subscription.dto';

/**
 * Converts a NewsletterSubscriptionDTO to a NewsletterSubscription entity.
 * @param subscriptionDTO - The NewsletterSubscriptionDTO to convert.
 * @returns The corresponding NewsletterSubscription entity.
 */
export function fromNewsletterSubscriptionDTO(
  subscriptionDTO:
    | NewsletterSubscriptionDTO
    | Partial<NewsletterSubscriptionDTO>,
): NewsletterSubscription {
  return new NewsletterSubscription(
    subscriptionDTO.id,
    subscriptionDTO.email,
    subscriptionDTO.shopId,
    subscriptionDTO.isActive,
    subscriptionDTO.subscribedAt,
  );
}
