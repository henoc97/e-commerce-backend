import { Injectable } from '@nestjs/common';
import { toPromotionDTO } from 'src/application/helper/to-dto/to.promotion.dto';
import { PromotionService } from 'src/application/services/promotion.service';
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';

/**
 * Use case class for updating a promotion.
 */
@Injectable()
export class UpdatePromotion {
  constructor(private readonly promotionService: PromotionService) {}

  /**
   * Executes the use case to update a promotion.
   * @param promotionId - The unique ID of the promotion.
   * @param promotionDTO - The updated Promotion DTO.
   * @returns A promise that resolves to the updated Promotion DTO.
   */
  async execute(
    promotionId: number,
    promotionDTO: PromotionDTO,
  ): Promise<PromotionDTO | null> {
    const promotion = await this.promotionService.updatePromotion(
      promotionId,
      promotionDTO,
    );
    return promotion ? toPromotionDTO(promotion) : null;
  }
}
