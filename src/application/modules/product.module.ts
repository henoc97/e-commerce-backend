import { Module } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductRepository } from 'src/infrastructure/persistences/product.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    ProductService,
    PrismaService,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
