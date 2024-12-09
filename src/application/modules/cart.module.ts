import { Module, forwardRef } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CartRepository } from '../../infrastructure/persistences/cart.repository.impl';
import { CartItemModule } from './cart-item.module';
import { AddItemToCart } from '../use-cases/cart.use-cases/add-item-to-cart.use-case';
import { CreateCart } from '../use-cases/cart.use-cases/create-cart.use-case';
import { FetchCartByUserId } from '../use-cases/cart.use-cases/fetch-cart-by-user-id.use-case';
import { DeleteCart } from '../use-cases/cart.use-cases/delete-cart.use-case';
import { ClearCart } from '../use-cases/cart.use-cases/clear-cart.use-case';
import { FetchCartById } from '../use-cases/cart.use-cases/fetch-cart-by-id.use-case';
import { RemoveItemFromCart } from '../use-cases/cart.use-cases/remove-item-from-cart.use-case';
import { MergeCarts } from '../use-cases/cart.use-cases/merge-carts.use-case';
import { UpdateCart } from '../use-cases/cart.use-cases/update-cart.use-case';
import { FetchItemCount } from '../use-cases/cart.use-cases/fetch-item-count.use-case';
import { FetchTotalValue } from '../use-cases/cart.use-cases/fetch-total-value.use-case';

const cartUseCases = [
  AddItemToCart,
  CreateCart,
  FetchCartByUserId,
  DeleteCart,
  ClearCart,
  FetchCartById,
  RemoveItemFromCart,
  MergeCarts,
  UpdateCart,
  FetchItemCount,
  FetchTotalValue,
];

@Module({
  imports: [forwardRef(() => CartItemModule)],
  providers: [
    CartService,
    {
      provide: 'ICartRepository',
      useClass: CartRepository,
    },
    ...cartUseCases,
  ],
  exports: [CartService, ...cartUseCases],
})
export class CartModule { }
