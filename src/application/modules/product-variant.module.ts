import { Module } from '@nestjs/common';
import { ProductVariantService } from '../services/product-variant.service';
import { ProductVariantRepository } from 'src/infrastructure/persistences/product-variant.repository.impl';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductVariant } from '../use-cases/product-variant.use-cases/create-product-variant.use-case';
import { FetchProductVariantsByProductId } from '../use-cases/product-variant.use-cases/fetch-product-variants-by-product-id.use-case';
import { DeleteProductVariantsByProductId } from '../use-cases/product-variant.use-cases/delete-product-variants-by-product-id.use-case';
import { FetchProductVariantsByName } from '../use-cases/product-variant.use-cases/fetch-product-variants-by-name.use-case';
import { DeleteProductVariant } from '../use-cases/product-variant.use-cases/delete-product-variant.use-case';
import { UpdateProductVariantDetails } from '../use-cases/product-variant.use-cases/update-product-variant-details.use-case';
import { FetchProductVariantById } from '../use-cases/product-variant.use-cases/fetch-product-variant-by-id.use-case';
import { FetchMostPopularVariant } from '../use-cases/product-variant.use-cases/fetch-most-popular-variant.use-case';
import { CheckProductVariantExistence } from '../use-cases/product-variant.use-cases/check-product-variant-existence.use-case';

const productVariantUseCases = [
  CreateProductVariant,
  FetchProductVariantsByProductId,
  DeleteProductVariantsByProductId,
  FetchProductVariantsByName,
  DeleteProductVariant,
  UpdateProductVariantDetails,
  FetchProductVariantById,
  FetchMostPopularVariant,
  CheckProductVariantExistence,
];

@Module({
  providers: [
    ProductVariantService,
    PrismaService,
    {
      provide: 'IProductVariantRepository',
      useClass: ProductVariantRepository,
    },
    ...productVariantUseCases,
  ],
  exports: [ProductVariantService, ...productVariantUseCases],
})
export class ProductVariantModule { }
