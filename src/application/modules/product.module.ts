import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/persistences/product.repository.impl';
import { RemovePromotionFromProduct } from '../use-cases/product.use-cases/remove-promotion-from-product.use-case';
import { DeleteProduct } from '../use-cases/product.use-cases/delete-product.use-case';
import { RemoveImageFromProduct } from '../use-cases/product.use-cases/remove-image-from-product.use-case';
import { FetchProductById } from '../use-cases/product.use-cases/fetch-product-by-id.use-case';
import { FindProductsByName } from '../use-cases/product.use-cases/find-products-by-name.use-case';
import { FindProductsByCategory } from '../use-cases/product.use-cases/find-products-by-category.use-case';
import { FindProductsByPriceRange } from '../use-cases/product.use-cases/find-products-by-price-range.use-case';
import { KafkaModule } from 'src/infrastructure/external-services/kafka/kafka.module';
import { PromotionModule } from './promotion.module';
import { CartItemModule } from './cart-item.module';
import { ProductVariantModule } from './product-variant.module';
import { ProductImageModule } from './product-image.module';
import { ReviewModule } from './review.module';
import ProductService from '../services/product.service';
import { AddImageToProduct } from '../use-cases/product.use-cases/add-image-to-product.use-case';
import { AddVariantToProduct } from '../use-cases/product.use-cases/add-variant-to-product.use-case';
import { AddCartItemToProduct } from '../use-cases/product.use-cases/add-cart-item-to-product.use-case';
import { AddPromotionToProduct } from '../use-cases/product.use-cases/add-promotion-to-product.use-case';
import { CreateProduct } from '../use-cases/product.use-cases/create-product.use-case';
import { AddReviewToProduct } from '../use-cases/product.use-cases/add-review-to-product.use-case';
import { UpdateProduct } from '../use-cases/product.use-cases/update-product.use-case';
import { UpdateProductStock } from '../use-cases/product.use-cases/update-product-stock.use-case';
import { FetchFeaturedProducts } from '../use-cases/product.use-cases/fetch-featured-products.use-case';
import { RemoveVariantFromProduct } from '../use-cases/product.use-cases/remove-variant-from-product.use-case';

const productUseCases = [
  AddImageToProduct,
  AddVariantToProduct,
  AddCartItemToProduct,
  AddPromotionToProduct,
  CreateProduct,
  AddReviewToProduct,
  UpdateProduct,
  UpdateProductStock,
  FetchFeaturedProducts,
  RemoveVariantFromProduct,
  RemoveImageFromProduct,
  RemovePromotionFromProduct,
  FetchProductById,
  DeleteProduct,
  FindProductsByName,
  FindProductsByCategory,
  FindProductsByPriceRange,
];

@Module({
  imports: [
    KafkaModule,
    PromotionModule,
    CartItemModule,
    ProductVariantModule,
    ProductImageModule,
    ReviewModule,
  ],
  providers: [
    ProductService,

    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    ...productUseCases,
  ],
  exports: [ProductService, ...productUseCases],
})
export class ProductModule { }
