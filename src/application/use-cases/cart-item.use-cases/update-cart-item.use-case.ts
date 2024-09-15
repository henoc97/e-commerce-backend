import { Injectable } from '@nestjs/common';
import { toCartItemDTO } from 'src/application/helper/to-dto/to.cart-item.dto';
import { CartItemService } from 'src/application/services/cart-item.service';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';

/**
 * Use case class for updating a cart item.
 */
@Injectable()
export class UpdateCartItem {
  constructor(private readonly cartItemService: CartItemService) {}

  /**
   * Executes the update-cart-item use case.
   * @param id - The unique ID of the cart item to update.
   * @param cartItemDTO - The CartItemDTO with the updated details.
   * @returns A promise that resolves to the updated CartItemDTO.
   */
  async execute(id: number, cartItemDTO: CartItemDTO): Promise<CartItemDTO> {
    const updatedCartItem = await this.cartItemService.updateCartItem(
      id,
      cartItemDTO,
    );
    return toCartItemDTO(updatedCartItem);
  }
}
