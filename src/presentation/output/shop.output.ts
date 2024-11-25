import { Field, ObjectType } from "@nestjs/graphql";
import { OrderOutput } from "./order.output";
import { ProductOutput } from "./product.output";
import { CategoryOutput } from "./category.output";
import { VendorOutput } from "./vendor.output";
import { MarketplaceOutput } from "./marketplace.output";
import { Type } from "class-transformer"
/**
 * Data Transfer Object for Shop.
 * Used for validating and transforming shop data in API requests and responses.
 */
@ObjectType()
export class ShopOutput {
  /**
   * Unique identifier for the shop.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * The name of the shop.
   */
  @Field()
  name: string;

  /**
   * The URL of the shop's website.
   */
  @Field()
  url: string;

  /**
   * Optional description of the shop.
   */
  @Field()
  description?: string;

  /**
   * The vendor associated with the shop.
   */
  @Field(() => VendorOutput, { nullable: true })
  @Type(() => VendorOutput)
  vendor?: VendorOutput;

  /**
   * Unique identifier for the vendor associated with the shop.
   */
  @Field()
  vendorId: number;

  /**
   * Optional array of products available in the shop.
   */
  @Field(() => [ProductOutput], { nullable: true })
  @Type(() => ProductOutput)
  products?: ProductOutput[];

  /**
   * Optional array of orders associated with the shop.
   */
  @Field(() => [OrderOutput], { nullable: true })
  @Type(() => OrderOutput)
  orders?: OrderOutput[];

  /**
   * Optional array of categories associated with the shop.
   */
  @Field(() => [CategoryOutput], { nullable: true })
  @Type(() => CategoryOutput)
  categories?: CategoryOutput[];

  /**
   * The date and time when the shop was created.
   */
  @Field()
  createdAt: Date;

  /**
   * The date and time when the shop was last updated.
   */
  @Field()
  updatedAt: Date;

  /**
   * Optional marketplace where the shop is listed.
   */
  @Field(() => MarketplaceOutput, { nullable: true })
  @Type(() => MarketplaceOutput)
  Marketplace?: MarketplaceOutput;

  /**
   * Optional ID of the marketplace where the shop is listed.
   */
  @Field()
  marketplaceId?: number;

  /**
   * Creates a new ShopOutput instance.
   * @param id - Unique identifier for the shop.
   * @param name - The name of the shop.
   * @param url - The URL of the shop's website.
   * @param vendor - The vendor associated with the shop.
   * @param vendorId - Unique identifier for the vendor.
   * @param products - Optional array of products available in the shop.
   * @param orders - Optional array of orders associated with the shop.
   * @param categories - Optional array of categories associated with the shop.
   * @param createdAt - Date and time when the shop was created.
   * @param updatedAt - Date and time when the shop was last updated.
   * @param description - Optional description of the shop.
   * @param Marketplace - Optional marketplace where the shop is listed.
   * @param marketplaceId - Optional ID of the marketplace where the shop is listed.
   */
  constructor(
    id?: number,
    name?: string,
    url?: string,
    vendor?: VendorOutput,
    vendorId?: number,
    products: ProductOutput[] = [],
    orders: OrderOutput[] = [],
    categories: CategoryOutput[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    description?: string,
    Marketplace?: MarketplaceOutput,
    marketplaceId?: number,
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
    this.Marketplace = Marketplace;
    this.marketplaceId = marketplaceId;
  }
}
