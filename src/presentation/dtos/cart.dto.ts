import { IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartItemDTO } from './cart-item.dto';

/**
 * Data Transfer Object for Cart.
 * Used for validating and transforming data in API requests and responses.
 */
export class CartDTO {
  /**
   * Unique identifier for the Cart.
   * Optional during creation, required for updates.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Unique identifier for the User who owns the Cart.
   */
  @IsInt()
  @IsNotEmpty()
  userId: number;

  /**
   * Items in the Cart.
   * Validates each item using the CartItemDTO.
   * Optional during creation.
   */
  @ValidateNested({ each: true })
  @Type(() => CartItemDTO)
  @IsOptional()
  items?: CartItemDTO[];

  /**
   * Creates a new CartDTO instance.
   * @param id - Unique identifier for the Cart.
   * @param userId - Unique identifier for the User who owns the Cart.
   * @param user - The User who owns the Cart.
   * @param items - Items in the Cart (optional).
   */
  constructor(
    userId: number,
    items?: CartItemDTO[],
    id?: number
  ) {
    this.id = id;
    this.userId = userId;
    this.items = items;
  }
}
