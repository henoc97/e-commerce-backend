import { Injectable } from '@nestjs/common';
import { MarketplaceService } from '../../../application/services/marketplace.service';

/**
 * Use case class for deleting a marketplace.
 */
@Injectable()
export class DeleteMarketplace {
  constructor(private readonly service: MarketplaceService) { }

  /**
   * Execute the delete-marketplace use case.
   * @param id - The ID of the marketplace to delete.
   * @returns A promise that resolves to a boolean indicating success.
   */
  async execute(id: number): Promise<boolean> {
    return await this.service.deleteMarketplace(id);
  }
}
