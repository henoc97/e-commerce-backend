import { Injectable } from '@nestjs/common';
import { toCartItemDTO } from 'src/application/helper/to-dto/to.cart-item.dto';
import { CartItemService } from 'src/application/services/cart-item.service';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';

/**
 * Use case class for retrieving a cart item by its ID.
 */
@Injectable()
export class FetchCartItemById {
  constructor(private readonly cartItemService: CartItemService) {}

  /**
   * Executes the fetch-cart-item-by-id use case.
   * @param id - The unique ID of the cart item.
   * @returns A promise that resolves to the CartItemDTO if found, otherwise null.
   */
  async execute(id: number): Promise<CartItemDTO | null> {
    const cartItem = await this.cartItemService.getCartItemById(id);
    return cartItem ? toCartItemDTO(cartItem) : null;
  }
}
