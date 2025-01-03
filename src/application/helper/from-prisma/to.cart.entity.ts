﻿import { Cart } from '../../../domain/entities/cart.entity';
import { fromCartItemPrisma } from './to.cart-item.entity';
import { fromUserPrisma } from './to.user.entity';

/**
 * Converts a CartPrisma to a Cart entity.
 * @param cartPrisma - The CartPrisma to convert.
 * @returns The corresponding Cart entity.
 */
export function fromCartPrisma(cartPrisma: any): Cart {
  return new Cart(
    cartPrisma.id,
    cartPrisma.userId,
    cartPrisma.totalPrice,
    cartPrisma.totalQuantity,
    cartPrisma.estimatedShippingCost,
    cartPrisma.lastSaved,
    cartPrisma.items?.map((itemPrisma: any) => fromCartItemPrisma(itemPrisma)),
    cartPrisma.user ? fromUserPrisma(cartPrisma.user) : undefined,
  );
}
