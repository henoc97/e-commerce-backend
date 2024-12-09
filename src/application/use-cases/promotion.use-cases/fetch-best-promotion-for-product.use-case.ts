import { Injectable } from '@nestjs/common';
import { toPromotionDTO } from '../../../application/helper/to-dto/to.promotion.dto';
import { PromotionService } from '../../../application/services/promotion.service';
import { PromotionDTO } from '../../../presentation/dtos/promotion.dto';

/**
 * Use case class for fetching the best promotion for a specific product.
 */
@Injectable()
export class FetchBestPromotionForProduct {
  constructor(private readonly promotionService: PromotionService) { }

  /**
   * Executes the use case to fetch the best promotion for a given product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the best Promotion DTO for the product.
   */
  async execute(productId: number): Promise<PromotionDTO | null> {
    const promotion =
      await this.promotionService.getBestPromotionForProduct(productId);
    return promotion ? toPromotionDTO(promotion) : null;
  }
}
