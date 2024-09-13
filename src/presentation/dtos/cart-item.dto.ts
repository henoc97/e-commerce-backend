import { IsInt, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

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
   * Unique identifier for the Product associated with this CartItem.
   */
  @IsInt()
  @IsNotEmpty()
  productId: number;

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
     * @param id - Unique identifier for the CartItem.
     * @param cartId - Unique identifier for the Cart to which this item belongs.
     * @param cart - The Cart to which this item belongs.
     * @param productId - Unique identifier for the Product associated with this CartItem.
     * @param product - The Product associated with this CartItem.
     * @param quantity - Quantity of the Product in the CartItem.
     */
  constructor(
    cartId: number,
    productId: number,
    quantity: number,
    id?: number
  ) {
    this.id = id;
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
  }
}
