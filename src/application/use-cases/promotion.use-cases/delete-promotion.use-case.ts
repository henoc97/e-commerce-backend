import { Injectable } from '@nestjs/common';
import { PromotionService } from '../../../application/services/promotion.service';

/**
 * Use case class for deleting a promotion.
 */
@Injectable()
export class DeletePromotion {
  constructor(private readonly promotionService: PromotionService) { }

  /**
   * Executes the use case to delete a promotion.
   * @param promotionId - The unique ID of the promotion to be deleted.
   * @returns A promise that resolves to a boolean indicating success.
   */
  async execute(promotionId: number): Promise<boolean> {
    return this.promotionService.deletePromotion(promotionId);
  }
}
