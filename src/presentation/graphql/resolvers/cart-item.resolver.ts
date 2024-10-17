import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CalculateCartTotal } from 'src/application/use-cases/cart-item.use-cases/calculate-cart-total.use-case';
import { ClearCart } from 'src/application/use-cases/cart-item.use-cases/clear-cart.use-case';
import { CreateCartItem } from 'src/application/use-cases/cart-item.use-cases/create-cart-item.use-case';
import { DeleteCartItem } from 'src/application/use-cases/cart-item.use-cases/delete-cart-item.use-case';
import { FetchCartItemById } from 'src/application/use-cases/cart-item.use-cases/fetch-cart-item-by-id.use-case';
import { FetchCartItemByProductAndCart } from 'src/application/use-cases/cart-item.use-cases/fetch-cart-item-by-product-and-cart.use-case';
import { FetchCartItemsByCartId } from 'src/application/use-cases/cart-item.use-cases/fetch-cart-items-by-cart-id.use-case';
import { FetchHighestQuantityItem } from 'src/application/use-cases/cart-item.use-cases/fetch-highest-quantity-item.use-case';
import { UpdateCartItemQuantity } from 'src/application/use-cases/cart-item.use-cases/update-cart-item-quantity.use-case';
import { UpdateCartItem } from 'src/application/use-cases/cart-item.use-cases/update-cart-item.use-case';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';

@Resolver('CartItem')
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
  ) {}

  @Query(() => Number)
  async calculateCartTotal(@Args('cartId') cartId: number): Promise<number> {
    return this.calculateCartTotalUseCase.execute(cartId);
  }

  @Mutation(() => Boolean)
  async clearCart(@Args('cartId') cartId: number): Promise<boolean> {
    return this.clearCartUseCase.execute(cartId);
  }

  @Mutation(() => CartItemDTO)
  async createCartItem(
    @Args('cartItemDTO') cartItemDTO: CartItemDTO,
  ): Promise<CartItemDTO> {
    return this.createCartItemUseCase.execute(cartItemDTO);
  }

  @Mutation(() => Boolean)
  async deleteCartItem(@Args('id') id: number): Promise<boolean> {
    return this.deleteCartItemUseCase.execute(id);
  }

  @Query(() => CartItemDTO, { nullable: true })
  async fetchCartItemById(@Args('id') id: number): Promise<CartItemDTO | null> {
    return this.fetchCartItemByIdUseCase.execute(id);
  }

  @Query(() => CartItemDTO, { nullable: true })
  async fetchCartItemByProductAndCart(
    @Args('productId') productId: number,
    @Args('cartId') cartId: number,
  ): Promise<CartItemDTO | null> {
    return this.fetchCartItemByProductAndCartUseCase.execute(productId, cartId);
  }

  @Query(() => [CartItemDTO])
  async fetchCartItemsByCartId(
    @Args('cartId') cartId: number,
  ): Promise<CartItemDTO[]> {
    return this.fetchCartItemsByCartIdUseCase.execute(cartId);
  }

  @Query(() => CartItemDTO, { nullable: true })
  async fetchHighestQuantityItem(
    @Args('cartId') cartId: number,
  ): Promise<CartItemDTO | null> {
    return this.fetchHighestQuantityItemUseCase.execute(cartId);
  }

  @Mutation(() => CartItemDTO)
  async updateCartItemQuantity(
    @Args('id') id: number,
    @Args('quantity') quantity: number,
  ): Promise<CartItemDTO> {
    return this.updateCartItemQuantityUseCase.execute(id, quantity);
  }

  @Mutation(() => CartItemDTO)
  async updateCartItem(
    @Args('id') id: number,
    @Args('cartItemDTO') cartItemDTO: CartItemDTO,
  ): Promise<CartItemDTO> {
    return this.updateCartItemUseCase.execute(id, cartItemDTO);
  }
}
