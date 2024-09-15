import { Injectable } from '@nestjs/common';
import { toCartItemDTO } from 'src/application/helper/to-dto/to.cart-item.dto';
import { CartItemService } from 'src/application/services/cart-item.service';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';

/**
 * Use case class for retrieving all cart items by cart ID.
 */
@Injectable()
export class FetchCartItemsByCartId {
  constructor(private readonly cartItemService: CartItemService) {}

  /**
   * Executes the fetch-cart-items-by-cart-id use case.
   * @param cartId - The unique ID of the cart.
   * @returns A promise that resolves to an array of CartItemDTOs.
   */
  async execute(cartId: number): Promise<CartItemDTO[]> {
    const cartItems = await this.cartItemService.getCartItemsByCartId(cartId);
    return cartItems.map((cartItem) => toCartItemDTO(cartItem));
  }
}
