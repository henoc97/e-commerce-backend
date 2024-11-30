import { Injectable } from '@nestjs/common';
import { ShopService } from 'src/application/services/shop.service';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { toShopDTO } from 'src/application/helper/to-dto/to.shop.dto';

/**
 * Use case class for listing all shops owned by a specific vendor.
 * This class encapsulates the business logic to retrieve shops based on vendor ID.
 */
@Injectable()
export class ListShopsByVendor {
  constructor(private readonly shopService: ShopService) { }

  /**
   * Execute the list-shops-by-vendor use case.
   * @param vendorId - The ID of the vendor to list shops for.
   * @returns A promise that resolves to an array of ShopDTO objects.
   */
  async execute(vendorId: number): Promise<ShopDTO[]> {
    const shops = await this.shopService.listShopsByVendor(vendorId);
    return shops?.map(toShopDTO);
  }
}
