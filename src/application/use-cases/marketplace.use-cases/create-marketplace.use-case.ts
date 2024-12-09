import { Injectable } from '@nestjs/common';
import { MarketplaceService } from '../../../application/services/marketplace.service';
import { MarketplaceDTO } from '../../../presentation/dtos/marketplace.dto';
import { toMarketplaceDTO } from '../../../application/helper/to-dto/to.marketplace.dto';

/**
 * Use case class for creating a marketplace.
 */
@Injectable()
export class CreateMarketplace {
  constructor(private readonly service: MarketplaceService) { }

  /**
   * Execute the create-marketplace use case.
   * @param dto - The DTO containing the marketplace data to create.
   * @returns A promise that resolves to the created Marketplace DTO.
   */
  async execute(dto: MarketplaceDTO): Promise<MarketplaceDTO | null> {
    const marketplace = await this.service.createMarketplace(dto);
    if (!marketplace) return null;
    return toMarketplaceDTO(marketplace);
  }
}
