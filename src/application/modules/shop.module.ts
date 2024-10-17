import { Module } from '@nestjs/common';
import { ShopService } from '../services/shop.service';
import { ShopRepository } from 'src/infrastructure/persistences/shop.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    ShopService,
    PrismaService,
    {
      provide: 'IShopRepository',
      useClass: ShopRepository,
    },
  ],
  exports: [ShopService],
})
export class ShopModule {}

