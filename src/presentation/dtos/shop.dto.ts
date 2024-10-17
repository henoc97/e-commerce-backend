import {
  IsInt,
  IsString,
  IsOptional,
  IsUrl,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDTO } from './product.dto';
import { OrderDTO } from './order.dto';
import { CategoryDTO } from './category.dto';
import { MarketplaceDTO } from './marketplace.dto';
import { VendorDTO } from './vendor.dto';

/**
 * Data Transfer Object for Shop.
 * Used for validating and transforming shop data in API requests and responses.
 */
export class ShopDTO {
  /**
   * Unique identifier for the shop.
   */
  @IsInt()
  id: number;

  /**
   * The name of the shop.
   */
  @IsString()
  name: string;

  /**
   * The URL of the shop's website.
   */
  @IsUrl()
  url: string;

  /**
   * Optional description of the shop.
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * The vendor associated with the shop.
   */
  @ValidateNested()
  @Type(() => VendorDTO)
  vendor?: VendorDTO;

  /**
   * Unique identifier for the vendor associated with the shop.
   */
  @IsInt()
  vendorId: number;

  /**
   * Optional array of products available in the shop.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  products?: ProductDTO[];

  /**
   * Optional array of orders associated with the shop.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderDTO)
  orders?: OrderDTO[];

  /**
   * Optional array of categories associated with the shop.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CategoryDTO)
  categories?: CategoryDTO[];

  /**
   * The date and time when the shop was created.
   */
  @IsDateString()
  createdAt: Date;

  /**
   * The date and time when the shop was last updated.
   */
  @IsDateString()
  updatedAt: Date;

  /**
   * Optional marketplace where the shop is listed.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => MarketplaceDTO)
  Marketplace?: MarketplaceDTO;

  /**
   * Optional ID of the marketplace where the shop is listed.
   */
  @IsOptional()
  @IsInt()
  marketplaceId?: number;

  /**
   * Creates a new ShopDTO instance.
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
    id: number,
    name: string,
    url: string,
    vendor: VendorDTO,
    vendorId: number,
    products: ProductDTO[] = [],
    orders: OrderDTO[] = [],
    categories: CategoryDTO[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    description?: string,
    Marketplace?: MarketplaceDTO,
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
