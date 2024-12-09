import { Injectable } from '@nestjs/common';
import { CartItemService } from '../../../application/services/cart-item.service';

/**
 * Use case class for clearing all items from a cart.
 */
@Injectable()
export class ClearCart {
  constructor(private readonly cartItemService: CartItemService) { }

  /**
   * Executes the clear-cart use case.
   * @param cartId - The unique ID of the cart to clear.
   * @returns A promise that resolves to true if all items were removed, otherwise false.
   */
  async execute(cartId: number): Promise<boolean> {
    return this.cartItemService.clearCart(cartId);
  }
}
