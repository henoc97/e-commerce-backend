﻿import { CartDTO } from 'src/presentation/dtos/cart.dto';
import { toCartItemDTO } from './to.cart-item.dto';
import { Cart } from 'src/domain/entities/cart.entity';
import { toUserDTO } from './to.user.dto';

/**
 * Converts a Cart entity to a CartDTO.
 * @param cart - The Cart entity to convert.
 * @returns The corresponding CartDTO.
 */
export function toCartDTO(cart: Cart): CartDTO {
  return new CartDTO(
    cart.userId,
    cart.id,
    cart.items.map((item) => toCartItemDTO(item)),
    cart.user ? toUserDTO(cart.user) : undefined,
  );
}
