import { Injectable } from '@nestjs/common';
import { Promotion } from 'src/domain/entities/promotion.entity';
import { IPromotionRepository } from 'src/domain/repositories/promotion.repository';
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';
/**
 * Service for managing promotional offers with business logic.
 */
@Injectable()
export class PromotionService {
  constructor(private readonly promotionRepository: IPromotionRepository) {}

  /**
   * Creates a new promotion.
   * @param promotionDTO - Data Transfer Object containing the promotion details.
   * @returns The created promotion.
   */
  async createPromotion(promotionDTO: PromotionDTO): Promise<Promotion> {
    const promotion = new Promotion(
      promotionDTO.id,
      promotionDTO.name,
      promotionDTO.discountValue,
      promotionDTO.discountType,
      promotionDTO.startDate,
      promotionDTO.endDate,
      promotionDTO.productId,
      null,
      promotionDTO.createdAt,
      promotionDTO.updatedAt,
    );
    return this.promotionRepository.create(promotion);
  }

  /**
   * Retrieves a promotion by its ID.
   * @param id - Unique identifier of the promotion.
   * @returns The promotion if found, or null.
   */
  async getPromotionById(id: number): Promise<Promotion | null> {
    return this.promotionRepository.getById(id);
  }

  /**
   * Updates a promotion's details.
   * @param id - Unique identifier of the promotion to be updated.
   * @param updates - The fields to update.
   * @returns The updated promotion.
   */
  async updatePromotion(
    id: number,
    updates: Partial<PromotionDTO>,
  ): Promise<Promotion> {
    // Convert DTO updates to entity
    const promotionUpdates = new Promotion(
      id,
      updates.name,
      updates.discountValue,
      updates.discountType,
      updates.startDate,
      updates.endDate,
      updates.productId,
      null,
      null,
      new Date(), // Update the modified date to the current date
    );
    return this.promotionRepository.modify(id, promotionUpdates);
  }

  /**
   * Removes a promotion by its ID.
   * @param id - Unique identifier of the promotion to be deleted.
   * @returns True if the deletion was successful, false otherwise.
   */
  async deletePromotion(id: number): Promise<boolean> {
    return this.promotionRepository.remove(id);
  }

  /**
   * Retrieves all promotions for a specific product.
   * @param productId - Unique identifier of the product.
   * @returns A list of promotions for the product.
   */
  async getPromotionsByProduct(productId: number): Promise<Promotion[]> {
    return this.promotionRepository.getByProduct(productId);
  }

  /**
   * Retrieves all promotions active within a specified date range.
   * @param start - The start date.
   * @param end - The end date.
   * @returns A list of promotions active within the date range.
   */
  async getActivePromotionsBetween(
    start: Date,
    end: Date,
  ): Promise<Promotion[]> {
    return this.promotionRepository.getActiveBetween(start, end);
  }

  /**
   * Retrieves all currently active promotions.
   * @returns A list of currently active promotions.
   */
  async getActivePromotions(): Promise<Promotion[]> {
    return this.promotionRepository.getActive();
  }

  /**
   * Finds the best promotion available for a given product.
   * @param productId - Unique identifier of the product.
   * @returns The most advantageous promotion for the product.
   */
  async getBestPromotionForProduct(
    productId: number,
  ): Promise<Promotion | null> {
    return this.promotionRepository.getBestForProduct(productId);
  }

  /**
   * Combines multiple promotions if applicable.
   * @param promotions - An array of promotions to combine.
   * @returns A combined promotion or null if combination is not possible.
   */
  async combinePromotions(promotions: Promotion[]): Promise<Promotion | null> {
    return this.promotionRepository.combine(promotions);
  }

  /**
   * Applies a promotion directly to a product.
   * @param productId - Unique identifier of the product.
   * @param promotionId - Unique identifier of the promotion to apply.
   * @returns The updated promotion if applied successfully.
   */
  async applyPromotionToProduct(
    productId: number,
    promotionId: number,
  ): Promise<Promotion> {
    return this.promotionRepository.applyToProduct(productId, promotionId);
  }
}
