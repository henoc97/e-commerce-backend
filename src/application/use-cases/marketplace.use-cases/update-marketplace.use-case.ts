import { Injectable } from '@nestjs/common';
import { MarketplaceService } from 'src/application/services/marketplace.service';
import { toMarketplaceDTO } from 'src/application/helper/to-dto/to.marketplace.dto';
import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';

/**
 * Use case class for updating a marketplace.
 */
@Injectable()
export class UpdateMarketplace {
  constructor(private readonly service: MarketplaceService) {}

  /**
   * Execute the update-marketplace use case.
   * @param id - The ID of the marketplace to update.
   * @param data - The updated marketplace data.
   * @returns A promise that resolves to the updated MarketplaceDTO.
   */
  async execute(
    id: number,
    data: Partial<MarketplaceDTO>,
  ): Promise<MarketplaceDTO | null> {
    const marketplace = await this.service.updateMarketplace(id, data);
    if (!marketplace) return null;
    return toMarketplaceDTO(marketplace);
  }
}
