import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';
import { toProductDTO } from './to.product.dto';
import { toCartDTO } from './to.cart.dto';

/**
 * Converts a CartItem entity to CartItemDTO.
 * @param cartItem - The CartItem entity to convert.
 * @returns The corresponding CartItemDTO.
 */
export function toCartItemDTO(cartItem: any): CartItemDTO {
  return new CartItemDTO(
    cartItem.cartId,
    cartItem.productId,
    cartItem.quantity,
    cartItem.id,
    cartItem.cart ? toCartDTO(cartItem.cart) : undefined,
    cartItem.product ? toProductDTO(cartItem.product) : undefined,
  );
}
