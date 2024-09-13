import { Product } from './product.entity';

/**
 * Represents a variant of a product, such as different sizes or colors.
 */
export class ProductVariant {
  /**
   * Unique identifier for the ProductVariant.
   */
  id: number;

  /**
   * ID of the associated Product.
   */
  productId: number;

  /**
   * The Product this variant belongs to.
   */
  product: Product;

  /**
   * Name of the variant, such as 'Size' or 'Color'.
   */
  name: string;

  /**
   * Value of the variant, such as 'Large' or 'Red'.
   */
  value: string;

  /**
   * Creates a new ProductVariant instance.
   * @param id - Unique identifier for the ProductVariant.
   * @param productId - ID of the associated Product.
   * @param product - The Product this variant belongs to.
   * @param name - Name of the variant.
   * @param value - Value of the variant.
   */
  constructor(
    id: number,
    productId: number,
    product: Product,
    name: string,
    value: string
  ) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.name = name;
    this.value = value;
  }
}
