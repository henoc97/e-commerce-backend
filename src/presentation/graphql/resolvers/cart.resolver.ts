import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddItemToCart } from 'src/application/use-cases/cart.use-cases/add-item-to-cart.use-case';
import { ClearCart } from 'src/application/use-cases/cart.use-cases/clear-cart.use-case';
import { CreateCart } from 'src/application/use-cases/cart.use-cases/create-cart.use-case';
import { DeleteCart } from 'src/application/use-cases/cart.use-cases/delete-cart.use-case';
import { FetchCartById } from 'src/application/use-cases/cart.use-cases/fetch-cart-by-id.use-case';
import { FetchCartByUserId } from 'src/application/use-cases/cart.use-cases/fetch-cart-by-user-id.use-case';
import { FetchItemCount } from 'src/application/use-cases/cart.use-cases/fetch-item-count.use-case';
import { FetchTotalValue } from 'src/application/use-cases/cart.use-cases/fetch-total-value.use-case';
import { MergeCarts } from 'src/application/use-cases/cart.use-cases/merge-carts.use-case';
import { RemoveItemFromCart } from 'src/application/use-cases/cart.use-cases/remove-item-from-cart.use-case';
import { UpdateCart } from 'src/application/use-cases/cart.use-cases/update-cart.use-case';
import { CartDTO } from 'src/presentation/dtos/cart.dto';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';

@Resolver('Cart')
export class CartResolver {
  constructor(
    private readonly addItemToCartUseCase: AddItemToCart,
    private readonly clearCartUseCase: ClearCart,
    private readonly createCartUseCase: CreateCart,
    private readonly deleteCartUseCase: DeleteCart,
    private readonly fetchCartByIdUseCase: FetchCartById,
    private readonly fetchCartByUserIdUseCase: FetchCartByUserId,
    private readonly fetchItemCountUseCase: FetchItemCount,
    private readonly fetchTotalValueUseCase: FetchTotalValue,
    private readonly mergeCartsUseCase: MergeCarts,
    private readonly removeItemFromCartUseCase: RemoveItemFromCart,
    private readonly updateCartUseCase: UpdateCart,
  ) {}

  @Mutation(() => CartDTO)
  async addItemToCart(
    @Args('cartId') cartId: number,
    @Args('item') item: CartItemDTO,
  ): Promise<CartDTO> {
    return this.addItemToCartUseCase.execute(cartId, item);
  }

  @Mutation(() => CartDTO)
  async clearCart(@Args('cartId') cartId: number): Promise<CartDTO | null> {
    return this.clearCartUseCase.execute(cartId);
  }

  @Mutation(() => CartDTO)
  async createCart(@Args('cart') cart: CartDTO): Promise<CartDTO> {
    return this.createCartUseCase.execute(cart);
  }

  @Mutation(() => Boolean)
  async deleteCart(@Args('cartId') cartId: number): Promise<boolean> {
    return this.deleteCartUseCase.execute(cartId);
  }

  @Query(() => CartDTO, { nullable: true })
  async fetchCartById(@Args('id') id: number): Promise<CartDTO | null> {
    return this.fetchCartByIdUseCase.execute(id);
  }

  @Query(() => [CartDTO])
  async fetchCartByUserId(@Args('userId') userId: number): Promise<CartDTO[]> {
    return this.fetchCartByUserIdUseCase.execute(userId);
  }

  @Query(() => Number)
  async fetchItemCount(@Args('cartId') cartId: number): Promise<number> {
    return this.fetchItemCountUseCase.execute(cartId);
  }

  @Query(() => Number)
  async fetchTotalValue(@Args('cartId') cartId: number): Promise<number> {
    return this.fetchTotalValueUseCase.execute(cartId);
  }

  @Mutation(() => CartDTO)
  async mergeCarts(
    @Args('sourceCartId') sourceCartId: number,
    @Args('targetCartId') targetCartId: number,
  ): Promise<CartDTO> {
    return this.mergeCartsUseCase.execute(sourceCartId, targetCartId);
  }

  @Mutation(() => CartDTO)
  async removeItemFromCart(
    @Args('cartId') cartId: number,
    @Args('itemId') itemId: number,
  ): Promise<CartDTO> {
    return this.removeItemFromCartUseCase.execute(cartId, itemId);
  }

  @Mutation(() => CartDTO)
  async updateCart(
    @Args('cartId') cartId: number,
    @Args('data') data: Partial<CartDTO>,
  ): Promise<CartDTO> {
    return this.updateCartUseCase.execute(cartId, data);
  }
}

