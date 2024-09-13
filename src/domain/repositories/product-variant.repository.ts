import { ProductVariant } from '../entities/product-variant.entity';

/**
 * Repository interface for managing ProductVariant entities.
 * Provides methods for CRUD operations and additional functionalities.
 */
export interface IProductVariantRepository {
  /**
   * Creates and saves a new ProductVariant.
   * @param variant - The ProductVariant entity to create.
   * @returns A promise that resolves to the created ProductVariant.
   * @throws Error if creation fails.
   */
  create(variant: ProductVariant): Promise<ProductVariant>;

  /**
   * Retrieves a ProductVariant by its unique ID.
   * @param id - The unique ID of the ProductVariant.
   * @returns A promise that resolves to the ProductVariant if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getById(id: number): Promise<ProductVariant | null>;

  /**
   * Updates an existing ProductVariant.
   * @param id - The unique ID of the ProductVariant.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated ProductVariant.
   * @throws Error i  f update fails.
   */
  update(id: number, updates: Partial<ProductVariant>): Promise<ProductVariant>;

  /**
   * Deletes a ProductVariant by its unique ID.
   * @param id - The unique ID of the ProductVariant.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Retrieves all ProductVariants associated with a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of ProductVariants.
   * @throws Error if retrieval fails.
   */
  getByProductId(productId: number): Promise<ProductVariant[]>;

  /**
   * Deletes all ProductVariants associated with a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  deleteByProductId(productId: number): Promise<boolean>;

  /**
   * Checks if a ProductVariant with a specific name and value exists for a product.
   * @param productId - The unique ID of the product.
   * @param name - The name of the ProductVariant.
   * @param value - The value of the ProductVariant.
   * @returns A promise that resolves to true if the variant exists, otherwise false.
   * @throws Error if check fails.
   */
  exists(productId: number, name: string, value: string): Promise<boolean>;

  /**
   * Updates the name and/or value of a specific ProductVariant.
   * @param id - The unique ID of the ProductVariant.
   * @param name - The new name for the ProductVariant (optional).
   * @param value - The new value for the ProductVariant (optional).
   * @returns A promise that resolves to the updated ProductVariant.
   * @throws Error if update fails.
   */
  updateDetails(
    id: number,
    name?: string,
    value?: string,
  ): Promise<ProductVariant>;

  /**
   * Retrieves all ProductVariants with a specific name for a given product.
   * @param productId - The unique ID of the product.
   * @param name - The name of the ProductVariants to retrieve.
   * @returns A promise that resolves to an array of ProductVariants with the given name.
   * @throws Error if retrieval fails.
   */
  getByName(productId: number, name: string): Promise<ProductVariant[]>;

  /**
   * Retrieves the most popular variant for a given product based on sales or views.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the most popular ProductVariant if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getMostPopularVariant(productId: number): Promise<ProductVariant | null>;
}
