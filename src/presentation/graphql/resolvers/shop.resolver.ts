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
import { FetchShopList } from 'src/application/use-cases/shop.use-cases/fetch-shop-list.use-case';
import { FetchShopRevenueReport } from 'src/application/use-cases/shop.use-cases/fetch-shop-revenue-report.use-case';
import { FetchShopSalesReport } from 'src/application/use-cases/shop.use-cases/fetch-shop-sales-report.use-case';
import { FetchTopProductForShop } from 'src/application/use-cases/shop.use-cases/fetch-top-product-for-shop.use-case';
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

@Resolver(() => ShopDTO)
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
    private readonly fetchShopListUseCase: FetchShopList,
    private readonly fetchShopRevenueReportUseCase: FetchShopRevenueReport,
    private readonly fetchShopSalesReportUseCase: FetchShopSalesReport,
    private readonly fetchTopProductForShopUseCase: FetchTopProductForShop,
    private readonly fetchTotalSalesForShopUseCase: FetchTotalSalesForShop,
    private readonly listShopsByVendorUseCase: ListShopsByVendor,
    private readonly removeCategoryFromShopUseCase: RemoveCategoryFromShop,
    private readonly removeProductFromShopUseCase: RemoveProductFromShop,
    private readonly searchShopsByNameUseCase: SearchShopsByName,
    private readonly updateShopUseCase: UpdateShop,
  ) {}

  @Mutation(() => ShopDTO, { nullable: true })
  async createShop(@Args('shop') shop: ShopDTO): Promise<ShopDTO | null> {
    return this.createShopUseCase.execute(shop);
  }

  @Mutation(() => ShopDTO, { nullable: true })
  async addCategoryToShop(
    @Args('shopId') shopId: number,
    @Args('category') category: CategoryDTO,
  ): Promise<ShopDTO | null> {
    return this.addCategoryToShopUseCase.execute(shopId, category);
  }

  @Mutation(() => ShopDTO, { nullable: true })
  async addOrderToShop(
    @Args('shopId') shopId: number,
    @Args('order') order: OrderDTO,
  ): Promise<ShopDTO | null> {
    return this.addOrderToShopUseCase.execute(shopId, order);
  }

  @Mutation(() => ShopDTO, { nullable: true })
  async addProductToShop(
    @Args('shopId') shopId: number,
    @Args('product') product: ProductDTO,
  ): Promise<ShopDTO | null> {
    return this.addProductToShopUseCase.execute(shopId, product);
  }

  @Mutation(() => ShopDTO, { nullable: true })
  async associateMarketplaceWithShop(
    @Args('shopId') shopId: number,
    @Args('marketplaceId') marketplaceId: number,
  ): Promise<ShopDTO | null> {
    return this.associateMarketplaceWithShopUseCase.execute(
      shopId,
      marketplaceId,
    );
  }

  @Mutation(() => Boolean)
  async deleteShop(@Args('id') id: number): Promise<boolean> {
    return this.deleteShopUseCase.execute(id);
  }

  @Query(() => ShopDTO, { nullable: true })
  async fetchMostRecentShop(): Promise<ShopDTO | null> {
    return this.fetchMostRecentShopUseCase.execute();
  }

  @Query(() => ShopDTO, { nullable: true })
  async fetchShopById(@Args('id') id: number): Promise<ShopDTO | null> {
    return this.fetchShopByIdUseCase.execute(id);
  }

  @Query(() => [ShopDTO])
  async fetchShopList(): Promise<ShopDTO[]> {
    return this.fetchShopListUseCase.execute();
  }

  @Query(() => [ShopDTO])
  async listShopsByVendor(
    @Args('vendorId') vendorId: number,
  ): Promise<ShopDTO[]> {
    return this.listShopsByVendorUseCase.execute(vendorId);
  }

  @Query(() => [ShopDTO])
  async searchShopsByName(@Args('name') name: string): Promise<ShopDTO[]> {
    return this.searchShopsByNameUseCase.execute(name);
  }

  @Mutation(() => ShopDTO)
  async updateShop(
    @Args('shopId') shopId: number,
    @Args('updates') updates: Partial<ShopDTO>,
  ): Promise<ShopDTO> {
    return this.updateShopUseCase.execute(shopId, updates);
  }

  @Query(() => [OrderDTO])
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

  @Query(() => [ShopDTO])
  async fetchShopRevenueReport(
    @Args('shopId') shopId: number,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<any> {
    return this.fetchShopRevenueReportUseCase.execute(
      shopId,
      startDate,
      endDate,
    );
  }

  @Query(() => [ShopDTO])
  async fetchShopSalesReport(
    @Args('shopId') shopId: number,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<any> {
    return this.fetchShopSalesReportUseCase.execute(shopId, startDate, endDate);
  }

  @Query(() => ProductDTO, { nullable: true })
  async fetchTopProductForShop(
    @Args('shopId') shopId: number,
  ): Promise<ProductDTO | null> {
    return this.fetchTopProductForShopUseCase.execute(shopId);
  }

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
