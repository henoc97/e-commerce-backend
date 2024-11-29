import { Module } from '@nestjs/common';
import { ProductImageService } from '../services/product-image.service';
import { ProductImageRepository } from 'src/infrastructure/persistences/product-image.repository.impl';
import { CreateProductImage } from '../use-cases/product-image.use-cases/create-product-image.use-case';
import { FetchProductImagesByProductId } from '../use-cases/product-image.use-cases/fetch-product-images-by-product-id.use-case';
import { UpdateProductImage } from '../use-cases/product-image.use-cases/update-product-image.use-case';
import { CountProductImagesByProductId } from '../use-cases/product-image.use-cases/count-product-images-by-product-id.use-case';
import { FetchPrimaryProductImage } from '../use-cases/product-image.use-cases/fetch-primary-product-image.use-case';
import { UpdateProductImageUrl } from '../use-cases/product-image.use-cases/update-product-image-url.use-case';
import { DeleteProductImagesByProductId } from '../use-cases/product-image.use-cases/delete-product-images-by-product-id.use-case';
import { FetchProductImageById } from '../use-cases/product-image.use-cases/fetch-product-image-by-id.use-case';
import { DeleteProductImage } from '../use-cases/product-image.use-cases/delete-product-image.use-case';
import { CheckProductImageExistence } from '../use-cases/product-image.use-cases/check-product-image-existence.use-case';

const productImageUseCases = [
  CreateProductImage,
  FetchProductImagesByProductId,
  UpdateProductImage,
  CountProductImagesByProductId,
  FetchPrimaryProductImage,
  UpdateProductImageUrl,
  DeleteProductImagesByProductId,
  FetchProductImageById,
  DeleteProductImage,
  CheckProductImageExistence,
];

@Module({
  providers: [
    ProductImageService,

    {
      provide: 'IProductImageRepository',
      useClass: ProductImageRepository,
    },
    ...productImageUseCases,
  ],
  exports: [ProductImageService, ...productImageUseCases],
})
export class ProductImageModule { }
