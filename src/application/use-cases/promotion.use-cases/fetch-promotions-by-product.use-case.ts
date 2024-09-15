import { Injectable } from '@nestjs/common';
import { toPromotionDTO } from 'src/application/helper/to-dto/to.promotion.dto';
import { PromotionService } from 'src/application/services/promotion.service';
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';

/**
 * Use case class for fetching all promotions for a specific product.
 */
@Injectable()
export class FetchPromotionsByProduct {
  constructor(private readonly promotionService: PromotionService) {}

  /**
   * Executes the use case to fetch all promotions associated with a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of Promotion DTOs.
   */
  async execute(productId: number): Promise<PromotionDTO[]> {
    const promotions =
      await this.promotionService.getPromotionsByProduct(productId);
    return promotions.map(toPromotionDTO);
  }
}
