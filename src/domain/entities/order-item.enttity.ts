import { Order } from './order.entity';
import { Product } from './product.entity';

/**
 * Represents an item in an order.
 * Contains information about the product, quantity, and price of the item in the order.
 */
export class OrderItem {
  /**
   * Unique identifier for the OrderItem.
   */
  id: number;

  /**
   * Unique identifier for the Order to which this item belongs.
   */
  orderId: number;

  /**
   * The Order to which this item belongs.
   */
  order: Order;

  /**
   * Unique identifier for the Product that is included in this order item.
   */
  productId: number;

  /**
   * The Product that is included in this order item.
   */
  product: Product;

  /**
   * Quantity of the Product included in this order item.
   */
  quantity: number;

  /**
   * Price of the Product at the time of the order.
   */
  price: number;

  /**
   * Creates a new OrderItem instance.
   * @param id - Unique identifier for the OrderItem.
   * @param orderId - Unique identifier for the Order to which this item belongs.
   * @param order - The Order to which this item belongs.
   * @param productId - Unique identifier for the Product that is included in this order item.
   * @param product - The Product that is included in this order item.
   * @param quantity - Quantity of the Product included in this order item.
   * @param price - Price of the Product at the time of the order.
   */
  constructor(
    id: number,
    orderId: number,
    order: Order,
    productId: number,
    product: Product,
    quantity: number,
    price: number,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.order = order;
    this.productId = productId;
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }
}
