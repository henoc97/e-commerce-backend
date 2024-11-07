// import { Injectable } from '@nestjs/common';
// import { toPromotionDTO } from 'src/application/helper/to-dto/to.promotion.dto';
// import { PromotionService } from 'src/application/services/promotion.service';
// import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';

// /**
//  * Use case class for applying a promotion to a product.
//  */
// @Injectable()
// export class ApplyPromotionToProduct {
//   constructor(private readonly promotionService: PromotionService) {}

//   /**
//    * Executes the use case to apply a promotion to a product.
//    * @param productId - The unique ID of the product.
//    * @param promotionId - The unique ID of the promotion.
//    * @returns A promise that resolves to the updated Promotion DTO.
//    */
//   async execute(productId: number, promotionId: number): Promise<PromotionDTO> {
//     const promotion = await this.promotionService.applyPromotionToProduct(
//       productId,
//       promotionId,
//     );
//     return toPromotionDTO(promotion);
//   }
// }
