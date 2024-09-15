import { Injectable } from '@nestjs/common';
import { CartItemService } from 'src/application/services/cart-item.service';

/**
 * Use case class for deleting a cart item by its ID.
 */
@Injectable()
export class DeleteCartItem {
  constructor(private readonly cartItemService: CartItemService) {}

  /**
   * Executes the delete-cart-item use case.
   * @param id - The unique ID of the cart item to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    return this.cartItemService.deleteCartItem(id);
  }
}
