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
  id: number;
  name: string;
  description?: string;
  price: number;
  promotions: Promotion[];
  category: Category;
  categoryId: number;
  images: ProductImage[];
  variants: ProductVariant[];
  stock: number;
  vendor?: Vendor;
  vendorId?: number;
  shop: Shop;
  shopId: number;
  createdAt: Date;
  updatedAt: Date;
  CartItem: CartItem[];
  OrderItem: OrderItem[];
  Review: Review[];

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
   * @param shop - The shop where the product is listed.
   * @param shopId - The ID of the shop where the product is listed.
   * @param createdAt - The date and time when the product was created.
   * @param updatedAt - The date and time when the product was last updated.
   * @param CartItem - An optional array of cart items associated with the product.
   * @param OrderItem - An optional array of order items associated with the product.
   * @param Review - An optional array of reviews for the product.
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
    shop: Shop,
    shopId: number,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    CartItem: CartItem[] = [],
    OrderItem: OrderItem[] = [],
    Review: Review[] = [],
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
    this.CartItem = CartItem;
    this.OrderItem = OrderItem;
    this.Review = Review;
  }
}
