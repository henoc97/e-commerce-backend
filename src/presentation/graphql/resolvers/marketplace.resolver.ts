import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { AddShopToMarketplace } from 'src/application/use-cases/marketplace.use-cases/add-shop-to-marketplace.use-case';
import { CreateMarketplace } from 'src/application/use-cases/marketplace.use-cases/create-marketplace.use-case';
import { DeleteMarketplace } from 'src/application/use-cases/marketplace.use-cases/delete-marketplace.use-case';
import { FetchMarketplaceById } from 'src/application/use-cases/marketplace.use-cases/fetch-marketplace-by-id.use-case';
import { FetchMarketplaceByShopId } from 'src/application/use-cases/marketplace.use-cases/fetch-marketplace-by-shop-id.use-case';
import { FetchShopsInMarketplace } from 'src/application/use-cases/marketplace.use-cases/fetch-shops-in-marketplace.use-case';
import { ListMarketplaces } from 'src/application/use-cases/marketplace.use-cases/list-marketplaces.use-case';
import { RemoveShopFromMarketplace } from 'src/application/use-cases/marketplace.use-cases/remove-shop-from-marketplace.use-case';
import { UpdateMarketplace } from 'src/application/use-cases/marketplace.use-cases/update-marketplace.use-case';

@Resolver(() => MarketplaceDTO)
export class MarketplaceResolver {
  constructor(
    private readonly addShopToMarketplaceUseCase: AddShopToMarketplace,
    private readonly createMarketplaceUseCase: CreateMarketplace,
    private readonly deleteMarketplaceUseCase: DeleteMarketplace,
    private readonly fetchMarketplaceByIdUseCase: FetchMarketplaceById,
    private readonly fetchMarketplaceByShopIdUseCase: FetchMarketplaceByShopId,
    private readonly fetchShopsInMarketplaceUseCase: FetchShopsInMarketplace,
    private readonly listMarketplacesUseCase: ListMarketplaces,
    private readonly removeShopFromMarketplaceUseCase: RemoveShopFromMarketplace,
    private readonly updateMarketplaceUseCase: UpdateMarketplace,
  ) {}

  @Query(() => [MarketplaceDTO])
  async listMarketplaces(): Promise<MarketplaceDTO[]> {
    return this.listMarketplacesUseCase.execute();
  }

  @Query(() => MarketplaceDTO, { nullable: true })
  async fetchMarketplaceById(
    @Args('id') id: number,
  ): Promise<MarketplaceDTO | null> {
    return this.fetchMarketplaceByIdUseCase.execute(id);
  }

  @Query(() => MarketplaceDTO, { nullable: true })
  async fetchMarketplaceByShopId(
    @Args('shopId') shopId: number,
  ): Promise<MarketplaceDTO | null> {
    return this.fetchMarketplaceByShopIdUseCase.execute(shopId);
  }

  @Query(() => [ShopDTO])
  async fetchShopsInMarketplace(
    @Args('marketplaceId') marketplaceId: number,
  ): Promise<ShopDTO[]> {
    return this.fetchShopsInMarketplaceUseCase.execute(marketplaceId);
  }

  @Mutation(() => MarketplaceDTO, { nullable: true })
  async createMarketplace(
    @Args('dto') dto: MarketplaceDTO,
  ): Promise<MarketplaceDTO | null> {
    return this.createMarketplaceUseCase.execute(dto);
  }

  @Mutation(() => Boolean)
  async deleteMarketplace(@Args('id') id: number): Promise<boolean> {
    return this.deleteMarketplaceUseCase.execute(id);
  }

  @Mutation(() => MarketplaceDTO, { nullable: true })
  async updateMarketplace(
    @Args('id') id: number,
    @Args('data') data: Partial<MarketplaceDTO>,
  ): Promise<MarketplaceDTO | null> {
    return this.updateMarketplaceUseCase.execute(id, data);
  }

  @Mutation(() => MarketplaceDTO, { nullable: true })
  async addShopToMarketplace(
    @Args('marketplaceId') marketplaceId: number,
    @Args('shopId') shopId: number,
  ): Promise<MarketplaceDTO | null> {
    return this.addShopToMarketplaceUseCase.execute(marketplaceId, shopId);
  }

  @Mutation(() => MarketplaceDTO, { nullable: true })
  async removeShopFromMarketplace(
    @Args('marketplaceId') marketplaceId: number,
    @Args('shopId') shopId: number,
  ): Promise<MarketplaceDTO | null> {
    return this.removeShopFromMarketplaceUseCase.execute(marketplaceId, shopId);
  }
}
