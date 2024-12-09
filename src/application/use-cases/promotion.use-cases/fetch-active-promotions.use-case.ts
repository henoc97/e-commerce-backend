import { Injectable } from '@nestjs/common';
import { toPromotionDTO } from '../../../application/helper/to-dto/to.promotion.dto';
import { PromotionService } from '../../../application/services/promotion.service';
import { PromotionDTO } from '../../../presentation/dtos/promotion.dto';

/**
 * Use case class for fetching all currently active promotions.
 */
@Injectable()
export class FetchActivePromotions {
  constructor(private readonly promotionService: PromotionService) { }

  /**
   * Executes the use case to fetch all currently active promotions.
   * @returns A promise that resolves to an array of active Promotion DTOs.
   */
  async execute(): Promise<PromotionDTO[]> {
    const promotions = await this.promotionService.getActivePromotions();
    return promotions?.map(toPromotionDTO);
  }
}
