import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateShop } from 'src/application/use-cases/shop.use-cases/create-shop.use-case';
import { AddCategoryToShop } from 'src/application/use-cases/shop.use-cases/add-category-to-shop.use-case';
import { AddOrderToShop } from 'src/application/use-cases/shop.use-cases/add-order-to-shop.use-case';
import { AddProductToShop } from 'src/application/use-cases/shop.use-cases/add-product-to-shop.use-case';
import { AssociateMarketplaceWithShop } from 'src/application/use-cases/shop.use-cases/associate-marketplace-with-shop.use-case';
import { DeleteShop } from 'src/application/use-cases/shop.use-cases/delete-shop.use-case';
import { FetchMostRecentShop } from 'src/application/use-cases/shop.use-cases/fetch-most-recent-shop.use-case';
import { FetchOrderReportForShop } from 'src/application/use-cases/shop.use-cases/fetch-order-report-for-shop.use-case';
import { FetchShopById } from 'src/application/use-cases/shop.use-cases/fetch-shop-by-id.use-case';
// import { FetchShopList } from 'src/application/use-cases/shop.use-cases/fetch-shop-list.use-case';
// import { FetchShopRevenueReport } from 'src/application/use-cases/shop.use-cases/fetch-shop-revenue-report.use-case';
// import { FetchShopSalesReport } from 'src/application/use-cases/shop.use-cases/fetch-shop-sales-report.use-case';
// import { FetchTopProductForShop } from 'src/application/use-cases/shop.use-cases/fetch-top-product-for-shop.use-case';
import { FetchTotalSalesForShop } from 'src/application/use-cases/shop.use-cases/fetch-total-sales-for-shop.use-case';
import { ListShopsByVendor } from 'src/application/use-cases/shop.use-cases/list-shops-by-vendor.use-case';
import { RemoveCategoryFromShop } from 'src/application/use-cases/shop.use-cases/remove-category-from-shop.use-case';
import { RemoveProductFromShop } from 'src/application/use-cases/shop.use-cases/remove-product-from-shop.use-case';
import { SearchShopsByName } from 'src/application/use-cases/shop.use-cases/search-shops-by-name.use-case';
import { UpdateShop } from 'src/application/use-cases/shop.use-cases/update-shop-details.use-case';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { transformShopDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { ShopOutput } from 'src/presentation/output/shop.output';
import { CategoryInput } from 'src/presentation/input/category.input';
import { OrderOutput } from 'src/presentation/output/order.output';
import { ShopInput } from 'src/presentation/input/shop.input';
import { toShopDTO } from 'src/application/helper/to-dto/to.shop.dto';
import { OrderInput } from 'src/presentation/input/order.input';
import { ProductInput } from 'src/presentation/input/product.input';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';

@Resolver(() => ShopOutput)
export class ShopResolver {
  constructor(
    private readonly createShopUseCase: CreateShop,
    private readonly addCategoryToShopUseCase: AddCategoryToShop,
    private readonly addOrderToShopUseCase: AddOrderToShop,
    private readonly addProductToShopUseCase: AddProductToShop,
    private readonly associateMarketplaceWithShopUseCase: AssociateMarketplaceWithShop,
    private readonly deleteShopUseCase: DeleteShop,
    private readonly fetchMostRecentShopUseCase: FetchMostRecentShop,
    private readonly fetchOrderReportForShopUseCase: FetchOrderReportForShop,
    private readonly fetchShopByIdUseCase: FetchShopById,
    // private readonly fetchShopListUseCase: FetchShopList,
    // private readonly fetchShopRevenueReportUseCase: FetchShopRevenueReport,
    // private readonly fetchShopSalesReportUseCase: FetchShopSalesReport,
    // private readonly fetchTopProductForShopUseCase: FetchTopProductForShop,
    private readonly fetchTotalSalesForShopUseCase: FetchTotalSalesForShop,
    private readonly listShopsByVendorUseCase: ListShopsByVendor,
    private readonly removeCategoryFromShopUseCase: RemoveCategoryFromShop,
    private readonly removeProductFromShopUseCase: RemoveProductFromShop,
    private readonly searchShopsByNameUseCase: SearchShopsByName,
    private readonly updateShopUseCase: UpdateShop,
  ) { }

  @Mutation(() => ShopOutput, { nullable: true })
  async createShop(@Args('shop') shop: ShopInput): Promise<ShopOutput | null> {
    const dto = toShopDTO(shop)
    const result = await this.createShopUseCase.execute(dto);
    return transformShopDTOToGraphQL(result)
  }

  @Mutation(() => ShopOutput, { nullable: true })
  async addCategoryToShop(
    @Args('shopId') shopId: number,
    @Args('category') category: CategoryInput,
  ): Promise<ShopOutput | null> {
    const result = await this.addCategoryToShopUseCase.execute(shopId, category);
    return transformShopDTOToGraphQL(result)
  }

  @Mutation(() => ShopOutput, { nullable: true })
  async addOrderToShop(
    @Args('shopId') shopId: number,
    @Args('order') order: OrderInput,
  ): Promise<ShopOutput | null> {
    const result = await this.addOrderToShopUseCase.execute(shopId, order);
    return transformShopDTOToGraphQL(result)
  }

  @Mutation(() => ShopOutput, { nullable: true })
  async addProductToShop(
    @Args('shopId') shopId: number,
    @Args('product') product: ProductInput,
  ): Promise<ShopOutput | null> {
    const dto = toProductDTO(product)
    const result = await this.addProductToShopUseCase.execute(shopId, dto);
    return transformShopDTOToGraphQL(result)
  }

  @Mutation(() => ShopOutput, { nullable: true })
  async associateMarketplaceWithShop(
    @Args('shopId') shopId: number,
    @Args('marketplaceId') marketplaceId: number,
  ): Promise<ShopOutput | null> {
    const result = await this.associateMarketplaceWithShopUseCase.execute(
      shopId,
      marketplaceId,
    );
    return transformShopDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deleteShop(@Args('id') id: number): Promise<boolean> {
    return this.deleteShopUseCase.execute(id);
  }

  @Query(() => ShopOutput, { nullable: true })
  async fetchMostRecentShop(): Promise<ShopOutput | null> {
    const result = await this.fetchMostRecentShopUseCase.execute();
    return transformShopDTOToGraphQL(result)
  }

  @Query(() => ShopOutput, { nullable: true })
  async fetchShopById(@Args('id') id: number): Promise<ShopOutput | null> {
    const result = await this.fetchShopByIdUseCase.execute(id);
    return transformShopDTOToGraphQL(result)
  }

  // @Query(() => [ShopOutput])
  // async fetchShopList(): Promise<ShopOutput[]> {
  //   const result = awaiteturn this.fetchShopListUseCase.execute();
  // return transformShopDTOToGraphQL(result)
  // }

  @Query(() => [ShopOutput])
  async listShopsByVendor(
    @Args('vendorId') vendorId: number,
  ): Promise<ShopOutput[]> {
    const result = await this.listShopsByVendorUseCase.execute(vendorId);
    return result?.map(transformShopDTOToGraphQL)
  }

  @Query(() => [ShopOutput])
  async searchShopsByName(@Args('name') name: string): Promise<ShopOutput[]> {
    const result = await this.searchShopsByNameUseCase.execute(name);
    return result?.map(transformShopDTOToGraphQL)
  }

  @Mutation(() => ShopOutput)
  async updateShop(
    @Args('shopId') shopId: number,
    @Args('updates') updates: ShopInput,
  ): Promise<ShopOutput> {
    const result = await this.updateShopUseCase.execute(shopId, updates);
    return transformShopDTOToGraphQL(result)
  }

  @Query(() => [OrderOutput])
  async fetchOrderReportForShop(
    @Args('shopId') shopId: number,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<any> {
    return this.fetchOrderReportForShopUseCase.execute(
      shopId,
      startDate,
      endDate,
    );
  }

  // @Query(() => [ShopOutput])
  // async fetchShopRevenueReport(
  //   @Args('shopId') shopId: number,
  //   @Args('startDate') startDate: Date,
  //   @Args('endDate') endDate: Date,
  // ): Promise<any> {
  //   return this.fetchShopRevenueReportUseCase.execute(
  //     shopId,
  //     startDate,
  //     endDate,
  //   );
  // }

  // @Query(() => [ShopOutput])
  // async fetchShopSalesReport(
  //   @Args('shopId') shopId: number,
  //   @Args('startDate') startDate: Date,
  //   @Args('endDate') endDate: Date,
  // ): Promise<any> {
  //   return this.fetchShopSalesReportUseCase.execute(shopId, startDate, endDate);
  // }

  // @Query(() => ProductInput, { nullable: true })
  // async fetchTopProductForShop(
  //   @Args('shopId') shopId: number,
  // ): Promise<ProductDTO | null> {
  //   return this.fetchTopProductForShopUseCase.execute(shopId);
  // }

  @Query(() => Number)
  async fetchTotalSalesForShop(
    @Args('shopId') shopId: number,
  ): Promise<number> {
    return this.fetchTotalSalesForShopUseCase.execute(shopId);
  }

  @Mutation(() => Boolean)
  async removeCategoryFromShop(
    @Args('shopId') shopId: number,
    @Args('categoryId') categoryId: number,
  ): Promise<boolean> {
    return this.removeCategoryFromShopUseCase.execute(shopId, categoryId);
  }

  @Mutation(() => Boolean)
  async removeProductFromShop(
    @Args('shopId') shopId: number,
    @Args('productId') productId: number,
  ): Promise<boolean> {
    return this.removeProductFromShopUseCase.execute(shopId, productId);
  }
}
