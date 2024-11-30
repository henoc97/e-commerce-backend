import { Injectable } from '@nestjs/common';
import { MarketplaceService } from 'src/application/services/marketplace.service';
import { toMarketplaceDTO } from 'src/application/helper/to-dto/to.marketplace.dto';
import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';

/**
 * Use case class for listing all marketplaces.
 */
@Injectable()
export class ListMarketplaces {
  constructor(private readonly service: MarketplaceService) { }

  /**
   * Execute the list-marketplaces use case.
   * @returns A promise that resolves to an array of MarketplaceDTOs.
   */
  async execute(): Promise<MarketplaceDTO[]> {
    const marketplaces = await this.service.listMarketplaces();
    return marketplaces?.map(toMarketplaceDTO);
  }
}
