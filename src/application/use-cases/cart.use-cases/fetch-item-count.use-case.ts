import { Injectable } from '@nestjs/common';
import { CartService } from '../../../application/services/cart.service';

@Injectable()
export class FetchItemCount {
  constructor(private readonly cartService: CartService) { }

  /**
   * Retrieves the number of items in a specified cart.
   * @param cartId - The ID of the cart for which to get the item count.
   * @returns A promise that resolves to the number of items in the cart.
   */
  async execute(cartId: number): Promise<number> {
    return await this.cartService.getItemCount(cartId);
  }
}
