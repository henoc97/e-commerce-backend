import { Product } from './product.entity';

/**
 * Represents an image associated with a product.
 */
export class ProductImage {
  /**
   * Unique identifier for the product image.
   */
  id: number;

  /**
   * Foreign key linking this image to a Product.
   */
  productId: number;

  /**
   * The product entity associated with this image.
   */
  product: Product;

  /**
   * URL where the image is located.
   */
  url: string;

  /**
   * Creates a new instance of ProductImage.
   * @param id - The unique identifier for the product image.
   * @param productId - The ID of the product to which the image belongs.
   * @param product - The product entity associated with the image.
   * @param url - The URL of the product image.
   */
  constructor(id: number, productId: number, product: Product, url: string) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.url = url;
  }
}
