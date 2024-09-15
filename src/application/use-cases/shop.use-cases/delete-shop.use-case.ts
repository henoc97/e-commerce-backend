import { Injectable } from '@nestjs/common';
import { ShopService } from 'src/application/services/shop.service';

/**
 * Use case class for deleting a shop.
 * This class encapsulates the business logic for deleting shops.
 */
@Injectable()
export class DeleteShop {
  constructor(private readonly shopService: ShopService) {}

  /**
   * Execute the delete-shop use case.
   * @param id - The ID of the shop to be deleted.
   * @returns A promise that resolves to a boolean indicating success or failure.
   */
  async execute(id: number): Promise<boolean> {
    return this.shopService.deleteShop(id);
  }
}
