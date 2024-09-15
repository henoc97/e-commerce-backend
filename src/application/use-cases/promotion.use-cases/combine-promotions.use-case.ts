import { Injectable } from '@nestjs/common';
import { toPromotionDTO } from 'src/application/helper/to-dto/to.promotion.dto';
import { PromotionService } from 'src/application/services/promotion.service';
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';

/**
 * Use case class for combining multiple promotions.
 */
@Injectable()
export class CombinePromotions {
  constructor(private readonly promotionService: PromotionService) {}

  /**
   * Executes the use case to combine multiple promotions.
   * @param promotions - Array of promotion IDs to combine.
   * @returns A promise that resolves to the combined Promotion DTO.
   */
  async execute(promotions: PromotionDTO[]): Promise<PromotionDTO | null> {
    const result = await this.promotionService.combinePromotions(promotions);
    return promotions ? toPromotionDTO(result) : null;
  }
}
