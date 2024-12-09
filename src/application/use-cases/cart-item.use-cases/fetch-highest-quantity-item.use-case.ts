import { Injectable } from '@nestjs/common';
import { toCartItemDTO } from '../../../application/helper/to-dto/to.cart-item.dto';
import { CartItemService } from '../../../application/services/cart-item.service';
import { CartItemDTO } from '../../../presentation/dtos/cart-item.dto';

/**
 * Use case class for retrieving the cart item with the highest quantity in a cart.
 */
@Injectable()
export class FetchHighestQuantityItem {
  constructor(private readonly cartItemService: CartItemService) { }

  /**
   * Executes the fetch-highest-quantity-item use case.
   * @param cartId - The unique ID of the cart.
   * @returns A promise that resolves to the CartItemDTO with the highest quantity, or null if no items are found.
   */
  async execute(cartId: number): Promise<CartItemDTO | null> {
    const cartItem = await this.cartItemService.getHighestQuantityItem(cartId);
    return cartItem ? toCartItemDTO(cartItem) : null;
  }
}
