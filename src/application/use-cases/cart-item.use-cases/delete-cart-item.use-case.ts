import { Injectable } from '@nestjs/common';
import { CartItemService } from '../../../application/services/cart-item.service';
import { CartDTO } from 'presentation/dtos/cart.dto';
import { FetchCartItemById } from './fetch-cart-item-by-id.use-case';
import { UpdateCart } from '../cart.use-cases/update-cart.use-case';

/**
 * Use case class for deleting a cart item by its ID.
 */
@Injectable()
export class DeleteCartItem {
  constructor(
    private readonly cartItemService: CartItemService,
    private readonly updateCart: UpdateCart,
  ) { }

  /**
   * Executes the delete-cart-item use case.
   * @param id - The unique ID of the cart item to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    const cartItem = await this.cartItemService.getCartItemById(id);
    const result = await this.cartItemService.deleteCartItem(id);
    var cart: CartDTO;
    if (result && cartItem) {
      const data = {
        "totalPrice": cartItem.cart.totalPrice - cartItem.product.price * cartItem.quantity,
        "totalQuantity": cartItem.cart.totalQuantity - cartItem.quantity,
        "estimatedShippingCost": 0.0
      }
      cart = await this.updateCart.execute(cartItem.cart.id, data);
    } else {
      return false;
    }
    if (cart) {
      return true;
    } else {
      return false;
    }
  }
}
