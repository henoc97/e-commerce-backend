import { Module } from '@nestjs/common';
import { CartItemService } from '../services/cart-item.service';
import { CartItemRepository } from 'src/infrastructure/persistences/cart-item.repository.impl';
import { PrismaService } from 'prisma/prisma.service';
import { CartModule } from './cart.module';
import { CreateCartItem } from '../use-cases/cart-item.use-cases/create-cart-item.use-case';
import { UpdateCartItem } from '../use-cases/cart-item.use-cases/update-cart-item.use-case';
import { FetchCartItemByProductAndCart } from '../use-cases/cart-item.use-cases/fetch-cart-item-by-product-and-cart.use-case';
import { ClearCart } from '../use-cases/cart-item.use-cases/clear-cart.use-case';
import { UpdateCartItemQuantity } from '../use-cases/cart-item.use-cases/update-cart-item-quantity.use-case';
import { FetchCartItemsByCartId } from '../use-cases/cart-item.use-cases/fetch-cart-items-by-cart-id.use-case';
import { DeleteCartItem } from '../use-cases/cart-item.use-cases/delete-cart-item.use-case';
import { FetchCartItemById } from '../use-cases/cart-item.use-cases/fetch-cart-item-by-id.use-case';
import { CalculateCartTotal } from '../use-cases/cart-item.use-cases/calculate-cart-total.use-case';
import { FetchHighestQuantityItem } from '../use-cases/cart-item.use-cases/fetch-highest-quantity-item.use-case';


const cartItemUseCases = [
  CreateCartItem,
  UpdateCartItem,
  FetchCartItemByProductAndCart,
  ClearCart,
  UpdateCartItemQuantity,
  FetchCartItemsByCartId,
  DeleteCartItem,
  FetchCartItemById,
  CalculateCartTotal,
  FetchHighestQuantityItem,
];

@Module({
  imports: [CartModule],
  providers: [
    CartItemService,
    PrismaService,
    {
      provide: 'ICartItemRepository',
      useClass: CartItemRepository,
    },
    ...cartItemUseCases,
  ],
  exports: [CartItemService, ...cartItemUseCases],
})
export class CartItemModule { }
