import { Module } from '@nestjs/common';
import { ProductImageService } from '../services/product-image.service';
import { ProductImageRepository } from 'src/infrastructure/persistences/product-image.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    ProductImageService,
    PrismaService,
    {
      provide: 'IProductImageRepository',
      useClass: ProductImageRepository,
    },
  ],
  exports: [ProductImageService],
})
export class ProductImageModule {}
