import { CartItem } from 'src/domain/entities/cart-item.entity';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';
import { fromCartDTO } from './to.cart.entity';
import { fromProductDTO } from './to.product.entity';

/**
 * Converts a CartItemDTO to a CartItem entity.
 * @param cartItemDTO - The CartItemDTO to convert.
 * @returns The corresponding CartItem entity.
 */
export function fromCartItemDTO(
  cartItemDTO: CartItemDTO | Partial<CartItemDTO>,
): CartItem {
  return new CartItem(
    cartItemDTO.id,
    cartItemDTO.cartId,
    cartItemDTO.cart ? fromCartDTO(cartItemDTO.cart) : undefined,
    cartItemDTO.productId,
    cartItemDTO.product ? fromProductDTO(cartItemDTO.product) : undefined,
    cartItemDTO.quantity,
  );
}
