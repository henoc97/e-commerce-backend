import { Injectable } from '@nestjs/common';
import { ShopService } from 'src/application/services/shop.service';

/**
 * Use case class for removing a product from a shop.
 * This class encapsulates the business logic to dissociate a product from a shop.
 */
@Injectable()
export class RemoveProductFromShop {
  constructor(private readonly shopService: ShopService) {}

  /**
   * Execute the remove-product-from-shop use case.
   * @param shopId - The ID of the shop from which the product will be removed.
   * @param productId - The ID of the product to remove.
   * @returns A promise that resolves to the updated Shop entity.
   */
  async execute(shopId: number, productId: number): Promise<boolean> {
    const result = await this.shopService.removeProductFromShop(
      shopId,
      productId,
    );
    return !!result;
  }
}
