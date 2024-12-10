import { Cart } from '../../../domain/entities/cart.entity';
import { CartDTO } from '../../../presentation/dtos/cart.dto';
import { fromCartItemDTO } from './to.cart-item.entity';
import { fromUserDTO } from './to.user.entity';

/**
 * Converts a CartDTO to a Cart entity.
 * @param cartDTO - The CartDTO to convert.
 * @returns The corresponding Cart entity.
 */
export function fromCartDTO(cartDTO: CartDTO | Partial<CartDTO>): Cart {
  return new Cart(
    cartDTO.id,
    cartDTO.userId,
    cartDTO.totalPrice,
    cartDTO.totalQuantity,
    cartDTO.estimatedShippingCost,
    cartDTO.lastSaved,
    cartDTO.items ? cartDTO.items?.map(fromCartItemDTO) : [],
    cartDTO.user ? fromUserDTO(cartDTO.user) : undefined,
  );
}
