import { CartItem } from 'src/domain/entities/cart-item.entity';
import { fromCartPrisma } from './to.cart.entity';
import { fromProductPrisma } from './to.product.entity';

/**
 * Converts a CartItemPrisma to a CartItem entity.
 * @param cartItemPrisma - The CartItemPrisma to convert.
 * @returns The corresponding CartItem entity.
 */
export function fromCartItemPrisma(cartItemPrisma: any): CartItem {
  return new CartItem(
    cartItemPrisma.id,
    cartItemPrisma.cartId,
    cartItemPrisma.cart ? fromCartPrisma(cartItemPrisma.cart) : undefined,
    cartItemPrisma.productId,
    cartItemPrisma.product
      ? fromProductPrisma(cartItemPrisma.product)
      : undefined,
    cartItemPrisma.quantity,
  );
}
