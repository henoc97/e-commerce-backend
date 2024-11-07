import { Module } from '@nestjs/common';
import { ShopService } from '../services/shop.service';
import { ShopRepository } from 'src/infrastructure/persistences/shop.repository.impl';
import { PrismaService } from 'prisma/prisma.service';
import { AddProductToShop } from '../use-cases/shop.use-cases/add-product-to-shop.use-case';
import { AddOrderToShop } from '../use-cases/shop.use-cases/add-order-to-shop.use-case';
import { CreateShop } from '../use-cases/shop.use-cases/create-shop.use-case';
import { AddCategoryToShop } from '../use-cases/shop.use-cases/add-category-to-shop.use-case';
import { RemoveProductFromShop } from '../use-cases/shop.use-cases/remove-product-from-shop.use-case';
import { ListShopsByVendor } from '../use-cases/shop.use-cases/list-shops-by-vendor.use-case';
import { RemoveCategoryFromShop } from '../use-cases/shop.use-cases/remove-category-from-shop.use-case';
import { AssociateMarketplaceWithShop } from '../use-cases/shop.use-cases/associate-marketplace-with-shop.use-case';
import { UpdateShop } from '../use-cases/shop.use-cases/update-shop-details.use-case';
import { FetchShopById } from '../use-cases/shop.use-cases/fetch-shop-by-id.use-case';
import { FetchTotalSalesForShop } from '../use-cases/shop.use-cases/fetch-total-sales-for-shop.use-case';
import { FetchMostRecentShop } from '../use-cases/shop.use-cases/fetch-most-recent-shop.use-case';
import { SearchShopsByName } from '../use-cases/shop.use-cases/search-shops-by-name.use-case';
import { ProductModule } from './product.module';
import { CategoryModule } from './category.module';
import { OrderModule } from './order.module';
import { FetchShopList } from '../use-cases/shop.use-cases/fetch-shop-list.use-case';
import { FetchTopProductForShop } from '../use-cases/shop.use-cases/fetch-top-product-for-shop.use-case';
import { FetchShopSalesReport } from '../use-cases/shop.use-cases/fetch-shop-sales-report.use-case';
import { FetchShopRevenueReport } from '../use-cases/shop.use-cases/fetch-shop-revenue-report.use-case';
import { FetchOrderReportForShop } from '../use-cases/shop.use-cases/fetch-order-report-for-shop.use-case';
import { DeleteShop } from '../use-cases/shop.use-cases/delete-shop.use-case';

const shopUseCases = [
  AddProductToShop,
  AddOrderToShop,
  CreateShop,
  AddCategoryToShop,
  RemoveProductFromShop,
  ListShopsByVendor,
  RemoveCategoryFromShop,
  DeleteShop,
  AssociateMarketplaceWithShop,
  UpdateShop,
  FetchShopById,
  FetchTotalSalesForShop,
  FetchMostRecentShop,
  SearchShopsByName,
  FetchShopList,
  FetchTopProductForShop,
  FetchShopSalesReport,
  FetchShopRevenueReport,
  FetchOrderReportForShop,
];

@Module({
  imports: [ProductModule, CategoryModule, OrderModule],
  providers: [
    ShopService,
    PrismaService,
    {
      provide: 'IShopRepository',
      useClass: ShopRepository,
    },
    ...shopUseCases,
  ],
  exports: [ShopService, ...shopUseCases],
})
export class ShopModule { }
