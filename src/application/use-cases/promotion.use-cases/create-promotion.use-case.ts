import { Injectable } from '@nestjs/common';
import { toPromotionDTO } from '../../../application/helper/to-dto/to.promotion.dto';
import { PromotionService } from '../../../application/services/promotion.service';
import { PromotionDTO } from '../../../presentation/dtos/promotion.dto';

/**
 * Use case class for creating a new promotion.
 */
@Injectable()
export class CreatePromotion {
  constructor(private readonly promotionService: PromotionService) { }

  /**
   * Executes the use case to create a new promotion.
   * @param promotionDTO - The Promotion DTO containing the promotion details.
   * @returns A promise that resolves to the created Promotion DTO.
   */
  async execute(promotionDTO: PromotionDTO): Promise<PromotionDTO | null> {
    const promotion = await this.promotionService.createPromotion(promotionDTO);
    return promotion ? toPromotionDTO(promotion) : null;
  }
}
