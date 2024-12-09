import { Injectable } from '@nestjs/common';
import { toPromotionDTO } from '../../../application/helper/to-dto/to.promotion.dto';
import { PromotionService } from '../../../application/services/promotion.service';
import { PromotionDTO } from '../../../presentation/dtos/promotion.dto';

/**
 * Use case class for fetching a promotion by its ID.
 */
@Injectable()
export class FetchPromotionById {
  constructor(private readonly promotionService: PromotionService) { }

  /**
   * Executes the use case to fetch a promotion by its ID.
   * @param id - The unique ID of the promotion.
   * @returns A promise that resolves to the Promotion DTO if found.
   */
  async execute(id: number): Promise<PromotionDTO | null> {
    const promotion = await this.promotionService.getPromotionById(id);
    return promotion ? toPromotionDTO(promotion) : null;
  }
}
