import { SubscriptionDTO } from '../../../presentation/dtos/subscription.dto';
import { fromVendorDTO } from './to.vendor.entity';
import { Subscription } from '../../../domain/entities/subscription.entity';

/**
 * Converts a SubscriptionDTO to a Subscription entity.
 * @param subscriptionDTO - The SubscriptionDTO to convert.
 * @returns The corresponding Subscription entity.
 */
export function fromSubscriptionDTO(
  subscriptionDTO: SubscriptionDTO | Partial<SubscriptionDTO>,
): Subscription {
  return new Subscription(
    subscriptionDTO.id,
    subscriptionDTO.name,
    subscriptionDTO.price,
    subscriptionDTO.currency,
    subscriptionDTO.duration,
    subscriptionDTO.description,
    subscriptionDTO.vendors?.map((vendorDTO) => fromVendorDTO(vendorDTO)) || [],
    new Date(subscriptionDTO.createdAt),
    new Date(subscriptionDTO.updatedAt),
  );
}
