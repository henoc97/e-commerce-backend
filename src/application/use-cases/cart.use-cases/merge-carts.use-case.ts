import { Injectable } from '@nestjs/common';
import { CartService } from '../../../application/services/cart.service';
import { CartDTO } from '../../../presentation/dtos/cart.dto';
import { toCartDTO } from '../../../application/helper/to-dto/to.cart.dto';

@Injectable()
export class MergeCarts {
  constructor(private readonly cartService: CartService) { }

  /**
   * Merges items from a source cart into a target cart and deletes the source cart.
   * @param sourceCartId - The ID of the source cart.
   * @param targetCartId - The ID of the target cart.
   * @returns A promise that resolves to the updated target CartDTO.
   */
  async execute(sourceCartId: number, targetCartId: number): Promise<CartDTO> {
    const cart = await this.cartService.mergeCarts(sourceCartId, targetCartId);
    return toCartDTO(cart);
  }
}
