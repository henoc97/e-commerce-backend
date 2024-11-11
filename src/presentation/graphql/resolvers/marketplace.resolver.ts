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
import { transformMarketplaceDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { Marketplace } from 'src/generated/graphql';

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
  ) { }

  @Query(() => ['Marketplace'])
  async listMarketplaces(): Promise<Marketplace[]> {
    const result = await this.listMarketplacesUseCase.execute();
    return result.map(transformMarketplaceDTOToGraphQL);
  }

  @Query(() => 'Marketplace', { nullable: true })
  async fetchMarketplaceById(
    @Args('id') id: number,
  ): Promise<Marketplace | null> {
    const result = await this.fetchMarketplaceByIdUseCase.execute(id);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Query(() => 'Marketplace', { nullable: true })
  async fetchMarketplaceByShopId(
    @Args('shopId') shopId: number,
  ): Promise<Marketplace | null> {
    const result = await this.fetchMarketplaceByShopIdUseCase.execute(shopId);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Query(() => [ShopDTO])
  async fetchShopsInMarketplace(
    @Args('marketplaceId') marketplaceId: number,
  ): Promise<ShopDTO[]> {
    return this.fetchShopsInMarketplaceUseCase.execute(marketplaceId);
  }

  @Mutation(() => 'Marketplace', { nullable: true })
  async createMarketplace(
    @Args('dto') dto: MarketplaceDTO,
  ): Promise<Marketplace | null> {
    const result = await this.createMarketplaceUseCase.execute(dto);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deleteMarketplace(@Args('id') id: number): Promise<boolean> {
    return this.deleteMarketplaceUseCase.execute(id);
  }

  @Mutation(() => 'Marketplace', { nullable: true })
  async updateMarketplace(
    @Args('id') id: number,
    @Args('data') data: MarketplaceDTO,
  ): Promise<Marketplace | null> {
    const result = await this.updateMarketplaceUseCase.execute(id, data);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Mutation(() => 'Marketplace', { nullable: true })
  async addShopToMarketplace(
    @Args('marketplaceId') marketplaceId: number,
    @Args('shopId') shopId: number,
  ): Promise<Marketplace | null> {
    const result = await this.addShopToMarketplaceUseCase.execute(marketplaceId, shopId);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Mutation(() => 'Marketplace', { nullable: true })
  async removeShopFromMarketplace(
    @Args('marketplaceId') marketplaceId: number,
    @Args('shopId') shopId: number,
  ): Promise<Marketplace | null> {
    const result = await this.removeShopFromMarketplaceUseCase.execute(marketplaceId, shopId);
    return transformMarketplaceDTOToGraphQL(result);
  }
}
