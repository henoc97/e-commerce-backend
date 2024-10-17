import { Module } from '@nestjs/common';
import { ProductVariantService } from '../services/product-variant.service';
import { ProductVariantRepository } from 'src/infrastructure/persistences/product-variant.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    ProductVariantService,
    PrismaService,
    {
      provide: 'IProductVariantRepository',
      useClass: ProductVariantRepository,
    },
  ],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}
