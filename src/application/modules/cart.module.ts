import { Module } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CartRepository } from 'src/infrastructure/persistences/cart.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    CartService,
    PrismaService,
    {
      provide: 'ICartRepository',
      useClass: CartRepository,
    },
  ],
  exports: [CartService],
})
export class CartModule {}
