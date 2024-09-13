import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDTO } from './product.dto';

/**
 * Data Transfer Object for ProductImage.
 * Used for validation and transformation of product image data in API requests and responses.
 */
export class ProductImageDTO {
  /**
   * Unique identifier for the product image.
   */
  @IsInt()
  id: number;

  /**
   * Foreign key linking this image to a Product.
   */
  @IsInt()
  productId: number;

  /**
   * The Product entity associated with this image.
   * This is a nested object validated separately.
   */
  @ValidateNested()
  @Type(() => ProductDTO)
  product: ProductDTO;

  /**
   * URL where the image is located.
   */
  @IsString()
  url: string;

  /**
   * Creates a new ProductImageDTO instance.
   * @param id - The unique identifier for the product image.
   * @param productId - The ID of the product to which the image belongs.
   * @param product - The Product entity associated with the image.
   * @param url - The URL of the product image.
   */
  constructor(
    id: number,
    productId: number,
    product: ProductDTO,
    url: string
  ) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.url = url;
  }
}
