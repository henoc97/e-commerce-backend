import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { toCartItemDTO } from '../../../application/helper/to-dto/to.cart-item.dto';
import { transformCartItemDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { CalculateCartTotal } from '../../../application/use-cases/cart-item.use-cases/calculate-cart-total.use-case';
import { ClearCart } from '../../../application/use-cases/cart-item.use-cases/clear-cart.use-case';
import { CreateCartItem } from '../../../application/use-cases/cart-item.use-cases/create-cart-item.use-case';
import { DeleteCartItem } from '../../../application/use-cases/cart-item.use-cases/delete-cart-item.use-case';
import { FetchCartItemById } from '../../../application/use-cases/cart-item.use-cases/fetch-cart-item-by-id.use-case';
import { FetchCartItemByProductAndCart } from '../../../application/use-cases/cart-item.use-cases/fetch-cart-item-by-product-and-cart.use-case';
import { FetchCartItemsByCartId } from '../../../application/use-cases/cart-item.use-cases/fetch-cart-items-by-cart-id.use-case';
import { FetchHighestQuantityItem } from '../../../application/use-cases/cart-item.use-cases/fetch-highest-quantity-item.use-case';
import { UpdateCartItemQuantity } from '../../../application/use-cases/cart-item.use-cases/update-cart-item-quantity.use-case';
import { UpdateCartItem } from '../../../application/use-cases/cart-item.use-cases/update-cart-item.use-case';
import { GqlAuthGuard } from '../../../infrastructure/external-services/auth/gql-auth.guard';
import { CartItemInput } from '../../../presentation/input/cart-item.input';
import { CartItemOutput } from '../../../presentation/output/cart-item.output';

@Resolver(() => CartItemOutput)
export class CartItemResolver {
  constructor(
    private readonly calculateCartTotalUseCase: CalculateCartTotal,
    private readonly clearCartUseCase: ClearCart,
    private readonly createCartItemUseCase: CreateCartItem,
    private readonly deleteCartItemUseCase: DeleteCartItem,
    private readonly fetchCartItemByIdUseCase: FetchCartItemById,
    private readonly fetchCartItemByProductAndCartUseCase: FetchCartItemByProductAndCart,
    private readonly fetchCartItemsByCartIdUseCase: FetchCartItemsByCartId,
    private readonly fetchHighestQuantityItemUseCase: FetchHighestQuantityItem,
    private readonly updateCartItemQuantityUseCase: UpdateCartItemQuantity,
    private readonly updateCartItemUseCase: UpdateCartItem,
  ) { }


  // @UseGuards(GqlAuthGuard )
  @Query(() => Number)
  async calculateCartTotal(@Args('cartId') cartId: number): Promise<number> {
    return this.calculateCartTotalUseCase.execute(cartId);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => Boolean)
  async clearCart(@Args('cartId') cartId: number): Promise<boolean> {
    return this.clearCartUseCase.execute(cartId);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => CartItemOutput)
  async createCartItem(
    @Args('cartItem') input: CartItemInput,
  ): Promise<CartItemOutput> {
    const dto = toCartItemDTO(input);
    const result = await this.createCartItemUseCase.execute(dto);
    return transformCartItemDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => Boolean)
  async deleteCartItem(@Args('id') id: number): Promise<boolean> {
    return this.deleteCartItemUseCase.execute(id);
  }

  // @UseGuards(GqlAuthGuard )
  @Query(() => CartItemOutput, { nullable: true })
  async fetchCartItemById(@Args('id') id: number): Promise<CartItemOutput | null> {
    const result = await this.fetchCartItemByIdUseCase.execute(id);
    return transformCartItemDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Query(() => CartItemOutput, { nullable: true })
  async fetchCartItemByProductAndCart(
    @Args('productId') productId: number,
    @Args('cartId') cartId: number,
  ): Promise<CartItemOutput | null> {
    const result = await this.fetchCartItemByProductAndCartUseCase.execute(productId, cartId);
    return transformCartItemDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Query(() => [CartItemOutput])
  async fetchCartItemsByCartId(
    @Args('cartId') cartId: number,
  ): Promise<CartItemOutput[]> {
    const result = await this.fetchCartItemsByCartIdUseCase.execute(cartId);
    return result?.map(transformCartItemDTOToGraphQL);
  }

  // @UseGuards(GqlAuthGuard )
  @Query(() => CartItemOutput, { nullable: true })
  async fetchHighestQuantityItem(
    @Args('cartId') cartId: number,
  ): Promise<CartItemOutput | null> {
    const result = await this.fetchHighestQuantityItemUseCase.execute(cartId);
    return transformCartItemDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => CartItemOutput)
  async updateCartItemQuantity(
    @Args('id') id: number,
    @Args('quantity') quantity: number,
  ): Promise<CartItemOutput> {
    const result = await this.updateCartItemQuantityUseCase.execute(id, quantity);
    return transformCartItemDTOToGraphQL(result);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => CartItemOutput)
  async updateCartItem(
    @Args('id') id: number,
    @Args('UpdateCartItemQuantityInput') input: CartItemInput,
  ): Promise<CartItemOutput> {
    const cartItemDTO = toCartItemDTO(input);
    const result = await this.updateCartItemUseCase.execute(id, cartItemDTO);
    return transformCartItemDTOToGraphQL(result);
  }
}
