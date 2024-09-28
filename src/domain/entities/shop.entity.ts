import { Category } from './category.entity';
import { Marketplace } from './marketplace.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { Vendor } from './vendor.entity';

/**
 * Represents a shop entity in the system.
 */
export class Shop {
  /**
   * Unique identifier for the shop.
   */
  id: number;

  /**
   * The name of the shop.
   */
  name: string;

  /**
   * The URL of the shop's website.
   */
  url: string;

  /**
   * Optional description of the shop.
   */
  description?: string;

  /**
   * The vendor associated with the shop.
   */
  vendor: Vendor;

  /**
   * The ID of the vendor associated with the shop.
   */
  vendorId: number;

  /**
   * An array of products available in the shop.
   */
  products: Product[];

  /**
   * An array of orders associated with the shop.
   */
  orders: Order[];

  /**
   * An array of categories associated with the shop.
   */
  categories: Category[];

  /**
   * The date and time when the shop was created.
   */
  createdAt: Date;

  /**
   * The date and time when the shop was last updated.
   */
  updatedAt: Date;

  /**
   * Optional marketplace where the shop is listed.
   */
  Marketplace?: Marketplace;

  /**
   * Optional ID of the marketplace where the shop is listed.
   */
  marketplaceId?: number;

  /**
   * Creates a new instance of Shop.
   * @param id - The unique identifier for the shop.
   * @param name - The name of the shop.
   * @param url - The URL of the shop's website.
   * @param vendorId - The ID of the vendor associated with the shop.
   * @param vendor - The vendor associated with the shop.
   * @param products - An optional array of products available in the shop.
   * @param orders - An optional array of orders associated with the shop.
   * @param categories - An optional array of categories associated with the shop.
   * @param createdAt - The date and time when the shop was created.
   * @param updatedAt - The date and time when the shop was last updated.
   * @param description - An optional description of the shop.
   * @param marketplaceId - An optional ID of the marketplace where the shop is listed.
   * @param Marketplace - An optional marketplace where the shop is listed.
   */
  constructor(
    id: number,
    name: string,
    url: string,
    vendorId: number,
    vendor: Vendor,
    products: Product[] = [],
    orders: Order[] = [],
    categories: Category[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    description?: string,
    marketplaceId?: number,
    Marketplace?: Marketplace,
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.description = description;
    this.vendor = vendor;
    this.vendorId = vendorId;
    this.products = products;
    this.orders = orders;
    this.categories = categories;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.marketplaceId = marketplaceId;
    this.Marketplace = Marketplace;
  }
}
