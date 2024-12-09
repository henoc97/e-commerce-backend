import { fromPromotionPrisma } from '../../application/helper/from-prisma/to.promotion.entity';
import { Promotion } from '../../domain/entities/promotion.entity';
import { IPromotionRepository } from '../../domain/repositories/promotion.repository';
import prisma from '../../../prisma/prisma.service';

/**
 * Repository for handling Promotion operations with Prisma.
 */
export class PromotionRepository implements IPromotionRepository {

  /**
   * Creates a new promotion.
   * @param promotion - The promotion data to be created.
   * @returns The created promotion.
   */
  async create(promotion: Promotion): Promise<Promotion> {
    try {
      const { id, product, ...data } = promotion;
      const newPromotion = await prisma.promotion.create({
        data: data,
      });
      return fromPromotionPrisma(newPromotion);
    } catch (error) {
      console.error('Error creating promotion:', error);
      throw new Error('Could not create promotion, error: ' + error);
    }
  }

  /**
   * Retrieves a promotion by its ID.
   * @param id - The ID of the promotion to retrieve.
   * @returns The promotion if found, otherwise null.
   */
  async getById(id: number): Promise<Promotion | null> {
    try {
      const result = await prisma.promotion.findUnique({ where: { id } });
      return fromPromotionPrisma(result);
    } catch (error) {
      console.error('Error retrieving promotion by ID:', error);
      throw new Error('Could not retrieve promotion, error: ' + error);
    }
  }

  /**
   * Updates a promotion's details.
   * @param id - The ID of the promotion to update.
   * @param updates - The fields to update.
   * @returns The updated promotion.
   */
  async modify(id: number, updates: Partial<Promotion>): Promise<Promotion> {
    try {
      const { product, ...data } = updates;
      const updatedPromotion = await prisma.promotion.update({
        where: { id },
        data: data,
      });
      return fromPromotionPrisma(updatedPromotion);
    } catch (error) {
      console.error('Error updating promotion:', error);
      throw new Error('Could not update promotion, error: ' + error);
    }
  }

  /**
   * Deletes a promotion by its ID.
   * @param id - The ID of the promotion to delete.
   * @returns True if deletion was successful, false otherwise.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await prisma.promotion.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting promotion:', error);
      return false;
    }
  }

  /**
   * Retrieves promotions for a specific product.
   * @param productId - The ID of the product.
   * @returns A list of promotions associated with the product.
   */
  async getByProduct(productId: number): Promise<Promotion[]> {
    try {
      const result = await prisma.promotion.findMany({
        where: { productId },
      });
      return result?.map(fromPromotionPrisma);
    } catch (error) {
      console.error('Error retrieving promotions by product:', error);
      throw new Error(
        'Could not retrieve promotions for product, error: ' + error,
      );
    }
  }

  /**
   * Retrieves active promotions within a given date range.
   * @param start - The start date of the range.
   * @param end - The end date of the range.
   * @returns A list of active promotions.
   */
  async getActiveBetween(start: Date, end: Date): Promise<Promotion[]> {
    try {
      const result = await prisma.promotion.findMany({
        where: {
          startDate: { gte: start },
          endDate: { lte: end },
        },
      });
      return result?.map(fromPromotionPrisma);
    } catch (error) {
      console.error('Error retrieving active promotions:', error);
      throw new Error('Could not retrieve active promotions, error: ' + error);
    }
  }

  /**
   * Retrieves all currently active promotions.
   * @returns A list of active promotions.
   */
  async getActive(): Promise<Promotion[]> {
    try {
      const now = new Date();
      const result = await prisma.promotion.findMany({
        where: {
          startDate: { lte: now },
          endDate: { gte: now },
        },
      });
      return result?.map(fromPromotionPrisma);
    } catch (error) {
      console.error('Error retrieving active promotions:', error);
      throw new Error('Could not retrieve active promotions, error: ' + error);
    }
  }

  /**
   * Retrieves the best promotion for a given product based on the discount.
   * @param productId - The ID of the product.
   * @returns The best promotion or null if none found.
   */
  async getBestForProduct(productId: number): Promise<Promotion | null> {
    try {
      const promotions = await prisma.promotion.findMany({
        where: { productId },
      });
      if (promotions.length === 0) return null;

      // Assuming "best" means the highest discount
      const bestPromotion = promotions.reduce((best, current) => {
        return current.discountValue > best.discountValue ? current : best;
      });
      return fromPromotionPrisma(bestPromotion);
    } catch (error) {
      console.error('Error retrieving best promotion for product:', error);
      throw new Error(
        'Could not retrieve best promotion for product, error: ' + error,
      );
    }
  }

  /**
   * Combines multiple promotions into one (if applicable).
   * @param promotions - The list of promotions to combine.
   * @returns The combined promotion or null if not applicable.
   */
  async combine(promotions: Promotion[]): Promise<Promotion | null> {
    try {
      if (promotions.length === 0) return null;

      const totalDiscountValue = promotions.reduce(
        (sum, promo) => sum + promo.discountValue,
        0,
      );

      // Assuming that combined promotions take the earliest start date and latest end date
      const combinedPromotion: Promotion = {
        ...promotions[0],
        discountValue: totalDiscountValue,
        startDate: promotions.reduce(
          (earliest, promo) =>
            promo.startDate < earliest ? promo.startDate : earliest,
          promotions[0].startDate,
        ),
        endDate: promotions.reduce(
          (latest, promo) => (promo.endDate > latest ? promo.endDate : latest),
          promotions[0].endDate,
        ),
      };
      return combinedPromotion;
    } catch (error) {
      console.error('Error combining promotions:', error);
      throw new Error('Could not combine promotions, error: ' + error);
    }
  }
}
