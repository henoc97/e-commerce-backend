import { Injectable } from '@nestjs/common';
import { toCartItemDTO } from '../../../application/helper/to-dto/to.cart-item.dto';
import { CartItemService } from '../../../application/services/cart-item.service';
import { CartItemDTO } from '../../../presentation/dtos/cart-item.dto';

/**
 * Use case class for creating a new cart item.
 */
@Injectable()
export class CreateCartItem {
  constructor(private readonly cartItemService: CartItemService) { }

  /**
   * Executes the create-cart-item use case.
   * @param cartItemDTO - The CartItemDTO containing the item data to be created.
   * @returns A promise that resolves to the created CartItem.
   */
  async execute(cartItemDTO: CartItemDTO): Promise<CartItemDTO> {
    const cartItem = await this.cartItemService.createCartItem(cartItemDTO);
    return toCartItemDTO(cartItem);
  }
}
