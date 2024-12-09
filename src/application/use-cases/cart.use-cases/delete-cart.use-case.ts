import { Injectable } from '@nestjs/common';
import { CartService } from '../../../application/services/cart.service';

/**
 * Use case class for deleting a specific cart.
 * This class encapsulates the business logic for deleting a cart.
 * It interacts with the Cart service to perform operations on the cart repository.
 */
@Injectable()
export class DeleteCart {
  constructor(private readonly cartService: CartService) { }

  /**
   * Executes the delete-cart use case.
   * @param cartId - The ID of the cart to be deleted.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async execute(cartId: number): Promise<boolean> {
    return this.cartService.deleteCart(cartId);
  }
}
