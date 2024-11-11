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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infrastructure/external-servicies/auth/jwt-auth.guard';
import { transformCartDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { Cart } from 'src/generated/graphql';

@Resolver(() => 'Cart')
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
  ) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'Cart')
  async addItemToCart(
    @Args('cartId') cartId: number,
    @Args('item') item: CartItemDTO,
  ): Promise<Cart> {
    const result = await this.addItemToCartUseCase.execute(cartId, item);
    return transformCartDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'Cart')
  async clearCart(@Args('cartId') cartId: number): Promise<Cart | null> {
    const result = await this.clearCartUseCase.execute(cartId);
    return transformCartDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'Cart')
  async createCart(@Args('input') input: CartDTO): Promise<Cart> {
    const result = await this.createCartUseCase.execute(input);
    return transformCartDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteCart(@Args('cartId') cartId: number): Promise<boolean> {
    return this.deleteCartUseCase.execute(cartId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => 'Cart', { nullable: true })
  async fetchCartById(@Args('id') id: number): Promise<Cart | null> {
    const result = await this.fetchCartByIdUseCase.execute(id);
    return transformCartDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['Cart'])
  async fetchCartByUserId(@Args('userId') userId: number): Promise<Cart[]> {
    const result = await this.fetchCartByUserIdUseCase.execute(userId);
    return result.map(transformCartDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Number)
  async fetchItemCount(@Args('cartId') cartId: number): Promise<number> {
    return this.fetchItemCountUseCase.execute(cartId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Number)
  async fetchTotalValue(@Args('cartId') cartId: number): Promise<number> {
    return this.fetchTotalValueUseCase.execute(cartId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'Cart')
  async mergeCarts(
    @Args('sourceCartId') sourceCartId: number,
    @Args('targetCartId') targetCartId: number,
  ): Promise<Cart> {
    const result = await this.mergeCartsUseCase.execute(sourceCartId, targetCartId);
    return transformCartDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'Cart')
  async removeItemFromCart(
    @Args('cartId') cartId: number,
    @Args('itemId') itemId: number,
  ): Promise<Cart> {
    const result = await this.removeItemFromCartUseCase.execute(cartId, itemId);
    return transformCartDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'Cart')
  async updateCart(
    @Args('cartId') cartId: number,
    @Args('data') data: CartDTO,
  ): Promise<Cart> {
    const result = await this.updateCartUseCase.execute(cartId, data);
    return transformCartDTOToGraphQL(result);
  }
}
