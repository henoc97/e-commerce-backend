import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';
import { toVendorDTO } from './to.vendor.dto';
import { Subscription } from 'src/domain/entities/subscription.entity';

/**
 * Converts a Subscription entity to a SubscriptionDTO.
 * @param subscription - The Subscription entity to convert.
 * @returns The corresponding SubscriptionDTO.
 */
export function toSubscriptionDTO(subscription: any): SubscriptionDTO {
  return new SubscriptionDTO(
    subscription.id,
    subscription.name,
    subscription.price,
    subscription.duration,
    subscription.description,
    subscription.vendors.map((vendor) => toVendorDTO(vendor)),
    subscription.createdAt,
    subscription.updatedAt,
  );
}
