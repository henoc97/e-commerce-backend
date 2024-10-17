import { Module } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { ReviewRepository } from 'src/infrastructure/persistences/review.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    ReviewService,
    PrismaService,
    {
      provide: 'IReviewRepository',
      useClass: ReviewRepository,
    },
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
