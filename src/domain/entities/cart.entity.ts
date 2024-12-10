import { CartItem } from './cart-item.entity';
import { User } from './user.entity';

/**
 * Represents a shopping cart for a user.
 * The cart holds items that the user intends to purchase.
 */
export class Cart {
  /**
   * Unique identifier for the Cart.
   */
  id: number;

  /**
   * Unique identifier for the User who owns the Cart.
   */
  userId: number;

  totalPrice: number;
  totalQuantity: number;
  estimatedShippingCost: number;
  lastSaved: Date

  /**
   * The User who owns the Cart.
   */
  user: User;

  /**
   * Items in the Cart.
   */
  items: CartItem[];

  /**
   * Creates a new Cart instance.
   * @param id - Unique identifier for the Cart.
   * @param userId - Unique identifier for the User who owns the Cart.
   * @param items - Items in the Cart (optional).
   * @param user - The User who owns the Cart.
   */
  constructor(id: number, userId: number, totalPrice: number, totalQuantity: number, estimatedShippingCost: number, lastSaved: Date, items: CartItem[] = [], user?: User) {
    this.id = id;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;
    this.estimatedShippingCost = estimatedShippingCost;
    this.lastSaved = lastSaved;
    this.user = user;
    this.items = items;
  }
}
