import { Module } from '@nestjs/common';
import { CartItemService } from '../services/cart-item.service';
import { CartItemRepository } from 'src/infrastructure/persistences/cart-item.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    CartItemService,
    PrismaService,
    {
      provide: 'ICartItemRepository',
      useClass: CartItemRepository,
    },
  ],
  exports: [CartItemService],
})
export class CartItemModule {}

