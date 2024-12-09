import { CartDTO } from '../../../presentation/dtos/cart.dto';
import { toCartItemDTO } from './to.cart-item.dto';
import { toUserDTO } from './to.user.dto';
import { CartItemDTO } from '../../../presentation/dtos/cart-item.dto';

/**
 * Converts a Cart entity to a CartDTO.
 * @param cart - The Cart entity to convert.
 * @returns The corresponding CartDTO.
 */
export function toCartDTO(cart: any): CartDTO {
  return new CartDTO(
    cart.userId,
    cart.totalPrice,
    cart.totalQuantity,
    cart.estimatedShippingCost,
    new Date(cart.lastSaved),
    cart.id,
    cart.items?.map((item: any) => toCartItemDTO(item)) as CartItemDTO[],
    cart.user ? toUserDTO(cart.user) : undefined,
  );
}
