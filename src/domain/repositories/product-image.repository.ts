import { ProductImage } from '../entities/product-image.entity';

/**
 * Repository interface for managing ProductImage entities.
 * Provides methods for CRUD operations and additional functionalities.
 */
export interface IProductImageRepository {
  /**
   * Creates and saves a new ProductImage.
   * @param image - The ProductImage entity to create.
   * @returns A promise that resolves to the created ProductImage.
   * @throws Error if creation fails.
   */
  create(image: ProductImage): Promise<ProductImage>;

  /**
   * Retrieves a ProductImage by its unique ID.
   * @param id - The unique ID of the ProductImage.
   * @returns A promise that resolves to the ProductImage if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getById(id: number): Promise<ProductImage | null>;

  /**
   * Updates an existing ProductImage with new data.
   * @param id - The unique ID of the ProductImage.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated ProductImage.
   * @throws Error if update fails.
   */
  update(id: number, updates: Partial<ProductImage>): Promise<ProductImage>;

  /**
   * Deletes a ProductImage by its unique ID.
   * @param id - The unique ID of the ProductImage.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Retrieves all ProductImages associated with a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of ProductImages.
   * @throws Error if retrieval fails.
   */
  getByProductId(productId: number): Promise<ProductImage[]>;

  /**
   * Deletes all ProductImages associated with a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  deleteByProductId(productId: number): Promise<boolean>;

  /**
   * Updates the URL of a specific ProductImage.
   * @param id - The unique ID of the ProductImage.
   * @param url - The new URL of the ProductImage.
   * @returns A promise that resolves to the updated ProductImage.
   * @throws Error if update fails.
   */
  updateUrl(id: number, url: string): Promise<ProductImage>;

  /**
   * Checks if a ProductImage exists for a specific product and URL.
   * @param productId - The unique ID of the product.
   * @param url - The URL of the ProductImage.
   * @returns A promise that resolves to true if the image exists, otherwise false.
   * @throws Error if check fails.
   */
  exists(productId: number, url: string): Promise<boolean>;

  /**
   * Retrieves the primary (main) image for a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the primary ProductImage if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getPrimaryImage(productId: number): Promise<ProductImage | null>;

  /**
   * Retrieves the total count of images for a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the total count of images for the product.
   * @throws Error if retrieval fails.
   */
  countImagesByProductId(productId: number): Promise<number>;
}
