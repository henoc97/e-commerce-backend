import { IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartItemDTO } from './cart-item.dto';
import { UserDTO } from './user.dto';

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
   * User associated with the address.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => UserDTO)
  user?: UserDTO;

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
   * Total price of the Cart.
   * Calculated by summing the prices of all items in the Cart.
   */
  totalPrice: number;

  totalQuantity: number;
  estimatedShippingCost: number;
  lastSaved: Date;

  /**
   * Creates a new CartDTO instance.
   * @param userId - Unique identifier for the User who owns the Cart.
   * @param totalPrice
   * @param totalQuantity
   * @param estimatedShippingCost
   * @param lastSaved
   * @param id - Unique identifier for the Cart (optional).
   * @param items - Items in the Cart (optional).
   * @param user - The User who owns the Cart (optional).
   */
  constructor(
    userId: number,
    totalPrice: number,
    totalQuantity: number,
    estimatedShippingCost: number,
    lastSaved: Date,
    id?: number,
    items?: CartItemDTO[],
    user?: UserDTO,
  ) {
    this.id = id;
    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;
    this.estimatedShippingCost = estimatedShippingCost;
    this.lastSaved = lastSaved;
    this.userId = userId;
    this.user = user;
    this.items = items;
  }
}
