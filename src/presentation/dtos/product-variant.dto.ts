import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDTO } from './product.dto';

/**
 * Data Transfer Object for ProductVariant.
 * Used for validation and transformation of product variant data in API requests and responses.
 */
export class ProductVariantDTO {
  /**
   * Unique identifier for the ProductVariant.
   */
  @IsInt()
  id: number;

  /**
   * ID of the associated Product.
   */
  @IsInt()
  productId: number;

  /**
   * The Product this variant belongs to.
   * This is a nested object validated separately.
   */
  @ValidateNested()
  @Type(() => ProductDTO)
  product: ProductDTO;

  /**
   * Name of the variant, such as 'Size' or 'Color'.
   */
  @IsString()
  name: string;

  /**
   * Value of the variant, such as 'Large' or 'Red'.
   */
  @IsString()
  value: string;

  /**
   * Creates a new ProductVariantDTO instance.
   * @param id - Unique identifier for the ProductVariant.
   * @param productId - ID of the associated Product.
   * @param product - The Product this variant belongs to.
   * @param name - Name of the variant.
   * @param value - Value of the variant.
   */
  constructor(
    id: number,
    productId: number,
    product: ProductDTO,
    name: string,
    value: string,
  ) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.name = name;
    this.value = value;
  }
}
