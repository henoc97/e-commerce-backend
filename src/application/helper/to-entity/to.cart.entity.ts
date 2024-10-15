import { Cart } from 'src/domain/entities/cart.entity';
import { CartDTO } from 'src/presentation/dtos/cart.dto';
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
    cartDTO.items ? cartDTO.items.map(fromCartItemDTO) : [],
    cartDTO.user ? fromUserDTO(cartDTO.user) : undefined,
  );
}
