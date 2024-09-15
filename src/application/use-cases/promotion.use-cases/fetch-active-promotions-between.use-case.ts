import { Injectable } from '@nestjs/common';
import { toPromotionDTO } from 'src/application/helper/to-dto/to.promotion.dto';
import { PromotionService } from 'src/application/services/promotion.service';
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';

/**
 * Use case class for fetching active promotions within a date range.
 */
@Injectable()
export class FetchActivePromotionsBetween {
  constructor(private readonly promotionService: PromotionService) {}

  /**
   * Executes the use case to fetch active promotions between specified dates.
   * @param start - The start date of the range.
   * @param end - The end date of the range.
   * @returns A promise that resolves to an array of active Promotion DTOs.
   */
  async execute(start: Date, end: Date): Promise<PromotionDTO[]> {
    const promotions = await this.promotionService.getActivePromotionsBetween(
      start,
      end,
    );
    return promotions.map(toPromotionDTO);
  }
}
