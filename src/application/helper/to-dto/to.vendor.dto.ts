import { Vendor } from 'src/domain/entities/vendor.entity';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';
import { toShopDTO } from './to.shop.dto';
import { toUserDTO } from './to.user.dto';
import { toProductDTO } from './to.product.dto';
import { toSubscriptionDTO } from './to.subscription.dto';

/**
 * Converts a Vendor entity to VendorDTO.
 * @param vendor - The Vendor entity to convert.
 * @returns The corresponding VendorDTO.
 */
export function toVendorDTO(vendor: Vendor): VendorDTO {
  return new VendorDTO(
    vendor.id,
    vendor.userId,
    vendor.user ? toUserDTO(vendor.user) : undefined,
    vendor.storeName,
    vendor.products.map((product) => toProductDTO(product)),
    vendor.subscriptionId,
    vendor.subscription ? toSubscriptionDTO(vendor.subscription) : undefined,
    vendor.shop ? toShopDTO(vendor.shop) : undefined,
  );
}
