import { Injectable } from '@nestjs/common';
import { toShopDTO } from '../../../application/helper/to-dto/to.shop.dto';
import { ShopService } from '../../../application/services/shop.service';
import { CategoryDTO } from '../../../presentation/dtos/category.dto';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';

/**
 * Use case class for adding a category to a shop.
 * This class encapsulates the business logic for adding a category.
 */
@Injectable()
export class AddCategoryToShop {
  constructor(private readonly shopService: ShopService) { }

  /**
   * Execute the add-category-to-shop use case.
   * @param shopId - The ID of the shop.
   * @param categoryDTO - The CategoryDTO containing the category data to be added.
   * @returns A promise that resolves to the updated Shop DTO.
   */
  async execute(
    shopId: number,
    categoryDTO: CategoryDTO,
  ): Promise<ShopDTO | null> {
    const updatedShop = await this.shopService.addCategoryToShop(
      shopId,
      categoryDTO,
    );

    if (!updatedShop) return null;

    return toShopDTO(updatedShop);
  }
}
