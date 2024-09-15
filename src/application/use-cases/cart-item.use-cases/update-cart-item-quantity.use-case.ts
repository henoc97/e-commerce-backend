import { Injectable } from '@nestjs/common';
import { toCartItemDTO } from 'src/application/helper/to-dto/to.cart-item.dto';
import { CartItemService } from 'src/application/services/cart-item.service';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';

/**
 * Use case class for updating the quantity of a cart item.
 */
@Injectable()
export class UpdateCartItemQuantity {
  constructor(private readonly cartItemService: CartItemService) {}

  /**
   * Executes the update-cart-item-quantity use case.
   * @param id - The unique ID of the cart item to update.
   * @param quantity - The new quantity to set.
   * @returns A promise that resolves to the updated CartItemDTO.
   */
  async execute(id: number, quantity: number): Promise<CartItemDTO> {
    const updatedCartItem = await this.cartItemService.updateCartItemQuantity(
      id,
      quantity,
    );
    return toCartItemDTO(updatedCartItem);
  }
}
