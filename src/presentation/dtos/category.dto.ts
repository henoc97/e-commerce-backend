import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDTO } from './product.dto';
import { ShopDTO } from './shop.dto';
/**
 * Data Transfer Object for Category.
 * Used for validating and transforming data in API requests and responses.
 */
export class CategoryDTO {
  /**
   * Unique identifier for the Category.
   * Optional during creation, required for updates.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Name of the Category.
   * Must be a non-empty string.
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The parent category of this category.
   * Validates the parent category using CategoryDTO if provided.
   * Optional.
   */
  @ValidateNested()
  @Type(() => CategoryDTO)
  @IsOptional()
  parent?: CategoryDTO;

  /**
   * ID of the parent Category.
   * Optional, will be used if parent is not provided.
   */
  @IsInt()
  @IsOptional()
  parentId?: number;

  /**
   * Child categories of this category.
   * Validates each child category using CategoryDTO.
   * Optional.
   */
  @ValidateNested({ each: true })
  @Type(() => CategoryDTO)
  @IsOptional()
  children?: CategoryDTO[];

  /**
   * Products associated with this Category.
   * Validates each product using ProductDTO.
   * Optional.
   */
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  @IsOptional()
  products?: ProductDTO[];

  /**
   * The Shop this category belongs to.
   * Validates the shop using ShopDTO if provided.
   * Optional.
   */
  @ValidateNested()
  @Type(() => ShopDTO)
  @IsOptional()
  shop?: ShopDTO;

  /**
   * ID of the Shop this category belongs to.
   * Optional, will be used if shop is not provided.
   */
  @IsInt()
  @IsOptional()
  shopId?: number;

  /**
   * Creates a new CategoryDTO instance.
   * @param id - Unique identifier for the Category.
   * @param name - Name of the Category.
   * @param parent - The parent category of this category (optional).
   * @param parentId - ID of the parent Category (optional).
   * @param children - Child categories of this category (optional).
   * @param products - Products associated with this Category (optional).
   * @param Shop - The Shop this category belongs to (optional).
   * @param shopId - ID of the Shop this category belongs to (optional).
   */
  constructor(
    name: string,
    parent?: CategoryDTO,
    parentId?: number,
    children?: CategoryDTO[],
    products?: ProductDTO[],
    shop?: ShopDTO,
    shopId?: number,
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.parentId = parentId;
    this.children = children;
    this.products = products;
    this.shop = shop;
    this.shopId = shopId;
  }
}
