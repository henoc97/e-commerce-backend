import { Cart } from './cart.entity';
import { Product } from './product.entity';

/**
 * Represents an item in a shopping cart.
 * Each CartItem links a specific product with a quantity to a cart.
 */
export class CartItem {
  /**
   * Unique identifier for the CartItem.
   */
  id: number;

  /**
   * Unique identifier for the Cart to which this item belongs.
   */
  cartId: number;

  /**
   * The Cart to which this item belongs.
   */
  cart: Cart;

  /**
   * Unique identifier for the Product associated with this CartItem.
   */
  productId: number;

  /**
   * The Product associated with this CartItem.
   */
  product: Product;

  /**
   * Quantity of the Product in the CartItem.
   */
  quantity: number;

  /**
   * Creates a new CartItem instance.
   * @param id - Unique identifier for the CartItem.
   * @param cartId - Unique identifier for the Cart to which this item belongs.
   * @param cart - The Cart to which this item belongs.
   * @param productId - Unique identifier for the Product associated with this CartItem.
   * @param product - The Product associated with this CartItem.
   * @param quantity - Quantity of the Product in the CartItem.
   */
  constructor(
    id: number,
    cartId: number,
    cart: Cart,
    productId: number,
    product: Product,
    quantity: number
  ) {
    this.id = id;
    this.cartId = cartId;
    this.cart = cart;
    this.productId = productId;
    this.product = product;
    this.quantity = quantity;
  }
}
