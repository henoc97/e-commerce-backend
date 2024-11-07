import { Module } from '@nestjs/common';
import { PromotionService } from '../services/promotion.service';
import { PromotionRepository } from 'src/infrastructure/persistences/promotion.repository.impl';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePromotion } from '../use-cases/promotion.use-cases/create-promotion.use-case';
import { UpdatePromotion } from '../use-cases/promotion.use-cases/update-promotion.use-case';
import { CombinePromotions } from '../use-cases/promotion.use-cases/combine-promotions.use-case';
import { DeletePromotion } from '../use-cases/promotion.use-cases/delete-promotion.use-case';
import { FetchActivePromotions } from '../use-cases/promotion.use-cases/fetch-active-promotions.use-case';
import { FetchPromotionById } from '../use-cases/promotion.use-cases/fetch-promotion-by-id.use-case';
import { FetchPromotionsByProduct } from '../use-cases/promotion.use-cases/fetch-promotions-by-product.use-case';
import { FetchBestPromotionForProduct } from '../use-cases/promotion.use-cases/fetch-best-promotion-for-product.use-case';
import { FetchActivePromotionsBetween } from '../use-cases/promotion.use-cases/fetch-active-promotions-between.use-case';
import { CartItemModule } from './cart-item.module';

const promotionUseCases = [
  CreatePromotion,
  UpdatePromotion,
  CombinePromotions,
  DeletePromotion,
  FetchActivePromotions,
  FetchPromotionById,
  FetchPromotionsByProduct,
  FetchBestPromotionForProduct,
  FetchActivePromotionsBetween,
];

@Module({
  imports: [CartItemModule],
  providers: [
    PromotionService,
    PrismaService,
    {
      provide: 'IPromotionRepository',
      useClass: PromotionRepository,
    },
    ...promotionUseCases,
  ],
  exports: [PromotionService, ...promotionUseCases],
})
export class PromotionModule { }
