import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ShopDTO } from './shop.dto';

/**
 * Data Transfer Object for Marketplace.
 * Used for validating and transforming data in API requests and responses.
 */
export class MarketplaceDTO {
  /**
   * Unique identifier for the Marketplace.
   * Optional during creation, required for updates.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Name of the Marketplace.
   * Must be a non-empty string.
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Description of the Marketplace.
   * Optional field providing additional information about the Marketplace.
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * List of shops within the Marketplace.
   * Validates each shop using ShopDTO.
   * Optional.
   */
  @ValidateNested({ each: true })
  @Type(() => ShopDTO)
  @IsOptional()
  shops?: ShopDTO[];

  /**
   * Creates a new MarketplaceDTO instance.
   * @param name - Name of the Marketplace.
   * @param description - (Optional) Description of the Marketplace.
   * @param shops - (Optional) List of shops within the Marketplace.
   * @param id - Unique identifier for the Marketplace (optional).
   */
  constructor(
    name: string,
    description?: string,
    shops?: ShopDTO[],
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.shops = shops;
  }
}
