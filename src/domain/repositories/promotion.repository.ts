import { Promotion } from '../entities/promotion.entity';

/**
 * Interface for managing promotional offers with enhanced business logic.
 */
export interface IPromotionRepository {
  /**
   * Adds a new promotion.
   * @param promotion - The promotion to be created.
   * @returns The created promotion.
   */
  create(promotion: Promotion): Promise<Promotion>;

  /**
   * Retrieves a promotion by its ID.
   * @param id - The ID of the promotion.
   * @returns The promotion if found, or null.
   */
  getById(id: number): Promise<Promotion | null>;

  /**
   * Updates a promotion's details.
   * @param id - The ID of the promotion to be updated.
   * @param updates - The fields to update.
   * @returns The updated promotion.
   */
  modify(id: number, updates: Partial<Promotion>): Promise<Promotion>;

  /**
   * Removes a promotion by its ID.
   * @param id - The ID of the promotion.
   * @returns True if the deletion was successful, false otherwise.
   */
  remove(id: number): Promise<boolean>;

  /**
   * Retrieves all promotions for a specific product.
   * @param productId - The ID of the product.
   * @returns A list of promotions for the product.
   */
  getByProduct(productId: number): Promise<Promotion[]>;

  /**
   * Retrieves all promotions active within a specified date range.
   * @param start - The start date.
   * @param end - The end date.
   * @returns A list of promotions active within the date range.
   */
  getActiveBetween(start: Date, end: Date): Promise<Promotion[]>;

  /**
   * Retrieves promotions currently active.
   * @returns A list of currently active promotions.
   */
  getActive(): Promise<Promotion[]>;

  /**
   * Finds the best promotion available for a given product.
   * @param productId - The ID of the product.
   * @returns The most advantageous promotion for the product.
   */
  getBestForProduct(productId: number): Promise<Promotion | null>;

  /**
   * Combines multiple promotions if applicable.
   * @param promotions - An array of promotions to combine.
   * @returns A combined promotion or null if combination is not possible.
   */
  combine(promotions: Promotion[]): Promise<Promotion | null>;

  /**
   * Applies a promotion directly to a product.
   * @param productId - The ID of the product.
   * @param promotionId - The ID of the promotion to apply.
   * @returns The updated promotion if applied successfully.
   */
  applyToProduct(productId: number, promotionId: number): Promise<Promotion>;
}
