import { Module } from '@nestjs/common';
import { MarketplaceService } from '../services/marketplace.service';
import { MarketplaceRepository } from '../../infrastructure/persistences/marketplace.repository.impl';
import { ListMarketplaces } from '../use-cases/marketplace.use-cases/list-marketplaces.use-case';
import { AddShopToMarketplace } from '../use-cases/marketplace.use-cases/add-shop-to-marketplace.use-case';
import { CreateMarketplace } from '../use-cases/marketplace.use-cases/create-marketplace.use-case';
import { UpdateMarketplace } from '../use-cases/marketplace.use-cases/update-marketplace.use-case';
import { RemoveShopFromMarketplace } from '../use-cases/marketplace.use-cases/remove-shop-from-marketplace.use-case';
import { FetchMarketplaceById } from '../use-cases/marketplace.use-cases/fetch-marketplace-by-id.use-case';
import { DeleteMarketplace } from '../use-cases/marketplace.use-cases/delete-marketplace.use-case';
import { FetchShopsInMarketplace } from '../use-cases/marketplace.use-cases/fetch-shops-in-marketplace.use-case';
import { FetchMarketplaceByShopId } from '../use-cases/marketplace.use-cases/fetch-marketplace-by-shop-id.use-case';
import { ShopModule } from './shop.module';

const marketplaceUseCases = [
  ListMarketplaces,
  AddShopToMarketplace,
  CreateMarketplace,
  UpdateMarketplace,
  RemoveShopFromMarketplace,
  FetchMarketplaceById,
  DeleteMarketplace,
  FetchShopsInMarketplace,
  FetchMarketplaceByShopId,
];

@Module({
  imports: [ShopModule],
  providers: [
    MarketplaceService,

    {
      provide: 'IMarketplaceRepository',
      useClass: MarketplaceRepository,
    },
    ...marketplaceUseCases,
  ],
  exports: [MarketplaceService, ...marketplaceUseCases],
})
export class MarketplaceModule { }
