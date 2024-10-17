import { Module } from '@nestjs/common';
import { PromotionService } from '../services/promotion.service';
import { PromotionRepository } from 'src/infrastructure/persistences/promotion.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    PromotionService,
    PrismaService,
    {
      provide: 'IPromotionRepository',
      useClass: PromotionRepository,
    },
  ],
  exports: [PromotionService],
})
export class PromotionModule {}
