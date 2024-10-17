import { Injectable } from '@nestjs/common';
import { CartService } from 'src/application/services/cart.service';

@Injectable()
export class FetchTotalValue {
  constructor(private readonly cartService: CartService) {}

  /**
   * Calculates the total value of a specified cart.
   * @param cartId - The ID of the cart for which to calculate the total value.
   * @returns A promise that resolves to the total value of the cart.
   */
  async execute(cartId: number): Promise<number> {
    return await this.cartService.getTotalValue(cartId);
  }
}
