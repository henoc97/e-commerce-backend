import { Vendor } from 'src/domain/entities/vendor.entity';
import { fromProductPrisma } from './to.product.entity';
import { fromShopPrisma } from './to.shop.entity';
import { fromSubscriptionPrisma } from './to.subscription.entity';
import { fromUserPrisma } from './to.user.entity';

/**
 * Converts a VendorPrisma to a Vendor entity.
 * @param vendorPrisma - The VendorPrisma to convert.
 * @returns The corresponding Vendor entity.
 */
export function fromVendorPrisma(vendorPrisma: any): Vendor {
  return new Vendor(
    vendorPrisma.id,
    vendorPrisma.userId,
    vendorPrisma.user ? fromUserPrisma(vendorPrisma.user) : undefined,
    vendorPrisma.storeName,
    vendorPrisma.products.map((product) => fromProductPrisma(product)),
    vendorPrisma.subscriptionId,
    vendorPrisma.subscription
      ? fromSubscriptionPrisma(vendorPrisma.subscription)
      : undefined,
    vendorPrisma.shop ? fromShopPrisma(vendorPrisma.shop) : undefined,
  );
}
