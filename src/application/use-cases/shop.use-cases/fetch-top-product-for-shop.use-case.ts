import { Injectable } from '@nestjs/common';
import { ShopService } from '../../../application/services/shop.service';
import { ProductDTO } from '../../../presentation/dtos/product.dto';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';

/**
 * Use case for fetching the top-selling product for a shop.
 * It interacts with the ShopService to retrieve the most sold product.
 */
@Injectable()
export class FetchTopProductForShop {
    constructor(private readonly shopService: ShopService) { }

    /**
     * Executes the fetch-top-product-for-shop use case.
     * @param shopId - The ID of the shop to retrieve the top product.
     * @returns A promise that resolves to the ProductDTO of the top product.
     */
    async execute(shopId: number): Promise<ProductDTO | null> {
        // const product = await this.shopService.getTopProductForShop(shopId);

        // if (!product) return null;

        // return toProductDTO(product);
        return null;
    }
}
