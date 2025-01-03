import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddItemToCart } from '../../../application/use-cases/cart.use-cases/add-item-to-cart.use-case';
import { ClearCart } from '../../../application/use-cases/cart.use-cases/clear-cart.use-case';
import { CreateCart } from '../../../application/use-cases/cart.use-cases/create-cart.use-case';
import { DeleteCart } from '../../../application/use-cases/cart.use-cases/delete-cart.use-case';
import { FetchCartById } from '../../../application/use-cases/cart.use-cases/fetch-cart-by-id.use-case';
import { FetchCartByUserId } from '../../../application/use-cases/cart.use-cases/fetch-cart-by-user-id.use-case';
import { FetchItemCount } from '../../../application/use-cases/cart.use-cases/fetch-item-count.use-case';
import { FetchTotalValue } from '../../../application/use-cases/cart.use-cases/fetch-total-value.use-case';
import { MergeCarts } from '../../../application/use-cases/cart.use-cases/merge-carts.use-case';
import { RemoveItemFromCart } from '../../../application/use-cases/cart.use-cases/remove-item-from-cart.use-case';
import { UpdateCart } from '../../../application/use-cases/cart.use-cases/update-cart.use-case';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../infrastructure/external-services/auth/gql-auth.guard';
import { transformCartDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { CartOutput } from '../../../presentation/output/cart.output';
import { CartItemInput } from '../../../presentation/input/cart-item.input';
import { toCartDTO } from '../../../application/helper/to-dto/to.cart.dto';
import { CartInput } from '../../input/cart.input';

@Resolver(() => CartOutput)
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

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => CartOutput)
  async addItemToCart(
    @Args('cartId') cartId: number,
    @Args('item') item: CartItemInput,
  ): Promise<CartOutput> {
    const result = await this.addItemToCartUseCase.execute(cartId, item);
    return transformCartDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => CartOutput)
  async clearCart(@Args('cartId') cartId: number): Promise<CartOutput | null> {
    const result = await this.clearCartUseCase.execute(cartId);
    return transformCartDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => CartOutput)
  async createCart(@Args('cart') input: CartInput): Promise<CartOutput> {
    const dto = toCartDTO(input);
    const result = await this.createCartUseCase.execute(dto);
    return transformCartDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => Boolean)
  async deleteCart(@Args('cartId') cartId: number): Promise<boolean> {
    return this.deleteCartUseCase.execute(cartId);
  }

  // @UseGuards(GqlAuthGuard )
  @Query(() => CartOutput, { nullable: true })
  async fetchCartById(@Args('id') id: number): Promise<CartOutput | null> {
    const result = await this.fetchCartByIdUseCase.execute(id);
    return transformCartDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Query(() => [CartOutput])
  async fetchCartByUserId(@Args('userId') userId: number): Promise<CartOutput[]> {
    const result = await this.fetchCartByUserIdUseCase.execute(userId);
    return result?.map(transformCartDTOToGraphQL);
  }

  // @UseGuards(GqlAuthGuard )
  @Query(() => Number)
  async fetchItemCount(@Args('cartId') cartId: number): Promise<number> {
    return this.fetchItemCountUseCase.execute(cartId);
  }

  // @UseGuards(GqlAuthGuard )
  @Query(() => Number)
  async fetchTotalValue(@Args('cartId') cartId: number): Promise<number> {
    return this.fetchTotalValueUseCase.execute(cartId);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => CartOutput)
  async mergeCarts(
    @Args('sourceCartId') sourceCartId: number,
    @Args('targetCartId') targetCartId: number,
  ): Promise<CartOutput> {
    const result = await this.mergeCartsUseCase.execute(sourceCartId, targetCartId);
    return transformCartDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => CartOutput)
  async removeItemFromCart(
    @Args('cartId') cartId: number,
    @Args('itemId') itemId: number,
  ): Promise<CartOutput> {
    const result = await this.removeItemFromCartUseCase.execute(cartId, itemId);
    return transformCartDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => CartOutput)
  async updateCart(
    @Args('cartId') cartId: number,
    @Args('data') data: CartItemInput,
  ): Promise<CartOutput> {
    const result = await this.updateCartUseCase.execute(cartId, data);
    return transformCartDTOToGraphQL(result);
  }
}
