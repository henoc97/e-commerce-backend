import { Injectable } from '@nestjs/common';
import { CartService } from 'src/application/services/cart.service';
import { CartDTO } from 'src/presentation/dtos/cart.dto';
import { toCartDTO } from 'src/application/helper/to-dto/to.cart.dto';

@Injectable()
export class RemoveItemFromCart {
  constructor(private readonly cartService: CartService) {}

  /**
   * Removes an item from a specified cart.
   * @param cartId - The ID of the cart from which the item will be removed.
   * @param itemId - The ID of the item to remove.
   * @returns A promise that resolves to the updated CartDTO.
   */
  async execute(cartId: number, itemId: number): Promise<CartDTO> {
    const cart = await this.cartService.removeItemFromCart(cartId, itemId);
    return toCartDTO(cart);
  }
}
