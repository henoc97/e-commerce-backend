import { Injectable } from '@nestjs/common';
import { toShopDTO } from 'src/application/helper/to-dto/to.shop.dto';
import { ShopService } from 'src/application/services/shop.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';

/**
 * Use case class for adding a product to a shop.
 * This class encapsulates the business logic for adding a product.
 */
@Injectable()
export class AddProductToShop {
  constructor(private readonly shopService: ShopService) {}

  /**
   * Execute the add-product-to-shop use case.
   * @param shopId - The ID of the shop.
   * @param productDTO - The ProductDTO containing the product data to be added.
   * @returns A promise that resolves to the updated Shop DTO.
   */
  async execute(
    shopId: number,
    productDTO: ProductDTO,
  ): Promise<ShopDTO | null> {
    const updatedShop = await this.shopService.addProductToShop(
      shopId,
      productDTO,
    );

    if (!updatedShop) return null;

    return toShopDTO(updatedShop);
  }
}
