import { Injectable } from '@nestjs/common';
import { toCartDTO } from '../../../application/helper/to-dto/to.cart.dto';
import { CartService } from '../../../application/services/cart.service';
import { CartDTO } from '../../../presentation/dtos/cart.dto';

/**
 * Use case class for clearing all items from a cart.
 */
@Injectable()
export class ClearCart {
  constructor(private readonly cartService: CartService) { }

  /**
   * Executes the clear-cart use case.
   * @param cartId - The unique ID of the cart to clear.
   * @returns A promise that resolves to true if all items were removed, otherwise null.
   */
  async execute(cartId: number): Promise<CartDTO | null> {
    const cart = await this.cartService.clearCart(cartId);
    return cart ? toCartDTO(cart) : null;
  }
}
