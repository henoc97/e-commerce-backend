import { Injectable } from '@nestjs/common';
import { CartItemService } from '../../../application/services/cart-item.service';

/**
 * Use case class for calculating the total value of items in a cart.
 */
@Injectable()
export class CalculateCartTotal {
  constructor(private readonly cartItemService: CartItemService) { }

  /**
   * Executes the calculate-cart-total use case.
   * @param cartId - The unique ID of the cart.
   * @returns A promise that resolves to the total value of the cart items.
   */
  async execute(cartId: number): Promise<number> {
    return this.cartItemService.calculateCartTotal(cartId);
  }
}
