import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CartDTO } from './cart.dto';
import { ProductDTO } from './product.dto';

/**
 * Data Transfer Object for CartItem.
 * Used for validating and transforming data in API requests and responses.
 */
export class CartItemDTO {
  /**
   * Unique identifier for the CartItem.
   * Optional during creation, required for updates.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Unique identifier for the Cart to which this item belongs.
   */
  @IsInt()
  @IsNotEmpty()
  cartId: number;

  /**
   * Cart associated with the cart-item.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => CartDTO)
  cart?: CartDTO;

  /**
   * Unique identifier for the Product associated with this CartItem.
   */
  @IsInt()
  @IsNotEmpty()
  productId: number;

  /**
   * User associated with the address.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDTO)
  product?: ProductDTO;

  /**
   * Quantity of the Product in the CartItem.
   * Must be a positive integer.
   */
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  /**
   * Creates a new CartItemDTO instance.
   * @param cartId - Unique identifier for the Cart to which this item belongs.
   * @param productId - Unique identifier for the Product associated with this CartItem.
   * @param quantity - Quantity of the Product in the CartItem.
   * @param id - Unique identifier for the CartItem (optional).
   * @param cart - The Cart to which this item belongs (optional).
   * @param product - The Product associated with this CartItem (optional).
   */
  constructor(
    cartId: number,
    productId: number,
    quantity: number,
    id?: number,
    cart?: CartDTO,
    product?: ProductDTO,
  ) {
    this.id = id;
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
    this.cart = cart;
    this.product = product;
  }
}
