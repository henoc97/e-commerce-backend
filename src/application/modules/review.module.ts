import { Module } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { ReviewRepository } from '../../infrastructure/persistences/review.repository.impl';
import { CreateReview } from '../use-cases/review.use-cases/create-review.use-case';
import { FetchReviewsByUser } from '../use-cases/review.use-cases/fetch-reviews-by-user.use-case';
import { UpdateReview } from '../use-cases/review.use-cases/update-review.use-case';
import { DeleteReview } from '../use-cases/review.use-cases/delete-review.use-case';
import { FetchFlaggedReviews } from '../use-cases/review.use-cases/fetch-flagged-reviews.use-case';
import { VerifyReview } from '../use-cases/review.use-cases/verify-review.use-case';
import { FlagReview } from '../use-cases/review.use-cases/flag-review.use-case';
import { FetchReviewById } from '../use-cases/review.use-cases/fetch-review-by-id.use-case';
import { FetchReviewsByProduct } from '../use-cases/review.use-cases/fetch-reviews-by-product.use-case';
import { FetchPopularReviews } from '../use-cases/review.use-cases/fetch-popular-reviews.use-case';
import { FetchReviewsByRating } from '../use-cases/review.use-cases/fetch-reviews-by-rating.use-case';
import { FetchAverageRating } from '../use-cases/review.use-cases/fetch-average-rating.use-case';
import { FetchReviewsByDateRange } from '../use-cases/review.use-cases/fetch-reviews-by-date-range.use-case';
import { KafkaModule } from '../../infrastructure/external-services/kafka/kafka.module';

const reviewUseCases = [
  CreateReview,
  FetchReviewsByUser,
  UpdateReview,
  DeleteReview,
  FetchFlaggedReviews,
  VerifyReview,
  FlagReview,
  FetchReviewById,
  FetchReviewsByProduct,
  FetchPopularReviews,
  FetchReviewsByRating,
  FetchAverageRating,
  FetchReviewsByDateRange,
];

@Module({
  imports: [KafkaModule],
  providers: [
    ReviewService,

    {
      provide: 'IReviewRepository',
      useClass: ReviewRepository,
    },
    ...reviewUseCases,
  ],
  exports: [ReviewService, ...reviewUseCases],
})
export class ReviewModule { }
