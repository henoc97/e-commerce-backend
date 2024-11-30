import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
import { MarketplaceOutput } from 'src/presentation/output/marketplace.output';
import { transformMarketplaceDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { MarketplaceInput } from 'src/presentation/input/marketplace.input';
import { ShopOutput } from 'src/presentation/output/shop.output';

@Resolver(() => MarketplaceInput)
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

  @Query(() => [MarketplaceOutput])
  async listMarketplaces(): Promise<MarketplaceOutput[]> {
    const result = await this.listMarketplacesUseCase.execute();
    return result?.map(transformMarketplaceDTOToGraphQL);
  }

  @Query(() => MarketplaceOutput, { nullable: true })
  async fetchMarketplaceById(
    @Args('id') id: number,
  ): Promise<MarketplaceOutput | null> {
    const result = await this.fetchMarketplaceByIdUseCase.execute(id);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Query(() => MarketplaceOutput, { nullable: true })
  async fetchMarketplaceByShopId(
    @Args('shopId') shopId: number,
  ): Promise<MarketplaceOutput | null> {
    const result = await this.fetchMarketplaceByShopIdUseCase.execute(shopId);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Query(() => [ShopOutput])
  async fetchShopsInMarketplace(
    @Args('marketplaceId') marketplaceId: number,
  ): Promise<ShopDTO[]> {
    return this.fetchShopsInMarketplaceUseCase.execute(marketplaceId);
  }

  @Mutation(() => MarketplaceOutput, { nullable: true })
  async createMarketplace(
    @Args('dto') dto: MarketplaceInput,
  ): Promise<MarketplaceOutput | null> {
    const result = await this.createMarketplaceUseCase.execute(dto);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deleteMarketplace(@Args('id') id: number): Promise<boolean> {
    return this.deleteMarketplaceUseCase.execute(id);
  }

  @Mutation(() => MarketplaceOutput, { nullable: true })
  async updateMarketplace(
    @Args('id') id: number,
    @Args('data') data: MarketplaceInput,
  ): Promise<MarketplaceOutput | null> {
    const result = await this.updateMarketplaceUseCase.execute(id, data);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Mutation(() => MarketplaceOutput, { nullable: true })
  async addShopToMarketplace(
    @Args('marketplaceId') marketplaceId: number,
    @Args('shopId') shopId: number,
  ): Promise<MarketplaceOutput | null> {
    const result = await this.addShopToMarketplaceUseCase.execute(marketplaceId, shopId);
    return transformMarketplaceDTOToGraphQL(result);
  }

  @Mutation(() => MarketplaceOutput, { nullable: true })
  async removeShopFromMarketplace(
    @Args('marketplaceId') marketplaceId: number,
    @Args('shopId') shopId: number,
  ): Promise<MarketplaceOutput | null> {
    const result = await this.removeShopFromMarketplaceUseCase.execute(marketplaceId, shopId);
    return transformMarketplaceDTOToGraphQL(result);
  }
}
