import { Injectable } from '@nestjs/common';
import { ShopService } from '../../../application/services/shop.service';

/**
 * Use case class for removing a category from a shop.
 * This class encapsulates the business logic to dissociate a category from a shop.
 */
@Injectable()
export class RemoveCategoryFromShop {
  constructor(private readonly shopService: ShopService) { }

  /**
   * Execute the remove-category-from-shop use case.
   * @param shopId - The ID of the shop from which the category will be removed.
   * @param categoryId - The ID of the category to remove.
   * @returns A promise that resolves to the updated Shop entity.
   */
  async execute(shopId: number, categoryId: number): Promise<boolean> {
    const result = await this.shopService.removeCategoryFromShop(
      shopId,
      categoryId,
    );
    return !!result;
  }
}
