import { Promotion } from './promotion.entity';
import { Vendor } from './vendor.entity';
import { Shop } from './shop.entity';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product-variant.entity';
import { CartItem } from './cart-item.entity';
import { Review } from './review.entity';
import { OrderItem } from './order-item.enttity';

/**
 * Represents a product entity in the system.
 */
export class Product {
  /**
   * Unique identifier for the product.
   */
  id: number;

  /**
   * The name of the product.
   */
  name: string;

  /**
   * Optional description of the product.
   */
  description?: string;

  /**
   * The price of the product.
   */
  price: number;

  /**
   * An array of promotions associated with the product.
   */
  promotions: Promotion[];

  /**
   * The category to which the product belongs.
   */
  category: Category;

  /**
   * The ID of the category to which the product belongs.
   */
  categoryId: number;

  /**
   * An array of images associated with the product.
   */
  images: ProductImage[];

  /**
   * An array of variants for the product (such as different sizes or colors).
   */
  variants: ProductVariant[];

  /**
   * The quantity of the product available in stock.
   */
  stock: number;

  /**
   * The vendor associated with the product (optional).
   */
  vendor?: Vendor;

  /**
   * The ID of the vendor associated with the product (optional).
   */
  vendorId?: number;

  /**
   * The shop where the product is listed.
   */
  shop?: Shop;

  /**
   * The ID of the shop where the product is listed.
   */
  shopId: number;

  /**
   * The date and time when the product was created.
   */
  createdAt: Date;

  /**
   * The date and time when the product was last updated.
   */
  updatedAt: Date;

  /**
   * An array of cart items associated with the product.
   */
  cartItem: CartItem[];

  /**
   * An array of order items associated with the product.
   */
  orderItem: OrderItem[];

  /**
   * An array of reviews for the product.
   */
  review: Review[];

  /**
   * Creates a new instance of Product.
   * @param id - The unique identifier for the product.
   * @param name - The name of the product.
   * @param price - The price of the product.
   * @param promotions - An optional array of promotions associated with the product.
   * @param category - The category to which the product belongs.
   * @param categoryId - The ID of the category to which the product belongs.
   * @param images - An optional array of images associated with the product.
   * @param variants - An optional array of variants for the product.
   * @param stock - The stock quantity of the product.
   * @param shopId - The ID of the shop where the product is listed.
   * @param createdAt - The date and time when the product was created.
   * @param updatedAt - The date and time when the product was last updated.
   * @param cartItem - An optional array of cart items associated with the product.
   * @param orderItem - An optional array of order items associated with the product.
   * @param review - An optional array of reviews for the product.
   * @param shop - The shop where the product is listed.
   * @param description - An optional description of the product.
   * @param vendor - An optional vendor associated with the product.
   * @param vendorId - An optional ID of the vendor associated with the product.
   */
  constructor(
    id: number,
    name: string,
    price: number,
    promotions: Promotion[] = [],
    category: Category,
    categoryId: number,
    images: ProductImage[] = [],
    variants: ProductVariant[] = [],
    stock: number,
    shopId: number,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    cartItem: CartItem[] = [],
    orderItem: OrderItem[] = [],
    review: Review[] = [],
    shop?: Shop,
    description?: string,
    vendor?: Vendor,
    vendorId?: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.promotions = promotions;
    this.category = category;
    this.categoryId = categoryId;
    this.images = images;
    this.variants = variants;
    this.stock = stock;
    this.vendor = vendor;
    this.vendorId = vendorId;
    this.shop = shop;
    this.shopId = shopId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.cartItem = cartItem;
    this.orderItem = orderItem;
    this.review = review;
  }
}
