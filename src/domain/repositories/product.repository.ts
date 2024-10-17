import { CartItem } from '../entities/cart-item.entity';
import { ProductImage } from '../entities/product-image.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { Product } from '../entities/product.entity';
import { Promotion } from '../entities/promotion.entity';
import { Review } from '../entities/review.entity';

/**
 * Repository interface for managing products and their related entities.
 */
export interface IProductRepository {
  /**
   * Creates and saves a new product.
   * @param product - The product entity to create.
   * @returns A promise that resolves to the created Product entity.
   * @throws Error if creation fails.
   */
  create(product: Product): Promise<Product>;

  /**
   * Retrieves a product by its unique ID.
   * @param id - The unique ID of the product.
   * @returns A promise that resolves to the Product entity if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getById(id: number): Promise<Product | null>;

  /**
   * Updates a product with the given data.
   * @param id - The unique ID of the product.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if update fails.
   */
  update(id: number, updates: Partial<Product>): Promise<Product>;

  /**
   * Deletes a product by its unique ID.
   * @param id - The unique ID of the product.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Finds products by their name.
   * @param name - The name of the product to search for.
   * @returns A promise that resolves to an array of Product entities matching the name.
   * @throws Error if retrieval fails.
   */
  findByName(name: string): Promise<Product[]>;

  /**
   * Finds products by their vendor.
   * @param vendor - The vendor of the product to search for.
   * @returns A promise that resolves to an array of Product entities matching the vendor.
   * @throws Error if retrieval fails.
   */
  findByVendor(vendorId: number): Promise<Product[]>;

  /**
   * Finds products within a specific category.
   * @param categoryId - The unique ID of the category.
   * @returns A promise that resolves to an array of Product entities in the category.
   * @throws Error if retrieval fails.
   */
  findByCategory(categoryId: number): Promise<Product[]>;

  /**
   * Updates the stock quantity of a product.
   * @param productId - The unique ID of the product.
   * @param quantity - The new stock quantity.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if update fails.
   */
  updateStock(productId: number, quantity: number): Promise<Product>;

  /**
   * Finds all products within a price range.
   * @param minPrice - The minimum price of the products.
   * @param maxPrice - The maximum price of the products.
   * @returns A promise that resolves to an array of Product entities within the price range.
   * @throws Error if retrieval fails.
   */
  findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>;

  /**
   * Retrieves a list of featured products.
   * @returns A promise that resolves to an array of featured Product entities.
   * @throws Error if retrieval fails.
   */
  getFeaturedProducts(): Promise<Product[]>;
}
