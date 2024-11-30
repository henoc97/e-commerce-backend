import { Vendor } from 'src/domain/entities/vendor.entity';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';
import { fromShopDTO } from './to.shop.entity';
import { fromProductDTO } from './to.product.entity';
import { fromUserDTO } from './to.user.entity';
import { fromSubscriptionDTO } from './to.subscription.entity';

/**
 * Converts a VendorDTO to a Vendor entity.
 * @param vendorDTO - The VendorDTO to convert.
 * @returns The corresponding Vendor entity.
 */
export function fromVendorDTO(
  vendorDTO: VendorDTO | Partial<VendorDTO>,
): Vendor {
  return new Vendor(
    vendorDTO.id,
    vendorDTO.userId,
    vendorDTO.user ? fromUserDTO(vendorDTO.user) : undefined,
    vendorDTO.storeName,
    vendorDTO.products?.map((product) => fromProductDTO(product)),
    vendorDTO.subscriptionId,
    vendorDTO.subscription
      ? fromSubscriptionDTO(vendorDTO.subscription)
      : undefined,
    vendorDTO.shop ? fromShopDTO(vendorDTO.shop) : undefined,
  );
}
