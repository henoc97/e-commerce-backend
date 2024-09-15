import { Injectable } from '@nestjs/common';
import { MarketplaceService } from 'src/application/services/marketplace.service';
import { toMarketplaceDTO } from 'src/application/helper/to-dto/to.marketplace.dto';
import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';

/**
 * Use case class for fetching a marketplace by its ID.
 */
@Injectable()
export class FetchMarketplaceById {
  constructor(private readonly service: MarketplaceService) {}

  /**
   * Execute the fetch-marketplace-by-id use case.
   * @param id - The ID of the marketplace to fetch.
   * @returns A promise that resolves to the Marketplace DTO if found, otherwise null.
   */
  async execute(id: number): Promise<MarketplaceDTO | null> {
    const marketplace = await this.service.getMarketplaceById(id);
    if (!marketplace) return null;
    return toMarketplaceDTO(marketplace);
  }
}
