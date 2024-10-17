import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateReview } from 'src/application/use-cases/review.use-cases/create-review.use-case';
import { DeleteReview } from 'src/application/use-cases/review.use-cases/delete-review.use-case';
import { FetchAverageRating } from 'src/application/use-cases/review.use-cases/fetch-average-rating.use-case';
import { FetchFlaggedReviews } from 'src/application/use-cases/review.use-cases/fetch-flagged-reviews.use-case';
import { FetchPopularReviews } from 'src/application/use-cases/review.use-cases/fetch-popular-reviews.use-case';
import { FetchReviewById } from 'src/application/use-cases/review.use-cases/fetch-review-by-id.use-case';
import { FetchReviewsByDateRange } from 'src/application/use-cases/review.use-cases/fetch-reviews-by-date-range.use-case';
import { FetchReviewsByProduct } from 'src/application/use-cases/review.use-cases/fetch-reviews-by-product.use-case';
import { FetchReviewsByRating } from 'src/application/use-cases/review.use-cases/fetch-reviews-by-rating.use-case';
import { FetchReviewsByUser } from 'src/application/use-cases/review.use-cases/fetch-reviews-by-user.use-case';
import { FlagReview } from 'src/application/use-cases/review.use-cases/flag-review.use-case';
import { UpdateReview } from 'src/application/use-cases/review.use-cases/update-review.use-case';
import { VerifyReview } from 'src/application/use-cases/review.use-cases/verify-review.use-case';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

@Resolver('Review')
export class ReviewResolver {
  constructor(
    private readonly createReviewUseCase: CreateReview,
    private readonly deleteReviewUseCase: DeleteReview,
    private readonly fetchAverageRatingUseCase: FetchAverageRating,
    private readonly fetchFlaggedReviewsUseCase: FetchFlaggedReviews,
    private readonly fetchPopularReviewsUseCase: FetchPopularReviews,
    private readonly fetchReviewByIdUseCase: FetchReviewById,
    private readonly fetchReviewsByDateRangeUseCase: FetchReviewsByDateRange,
    private readonly fetchReviewsByProductUseCase: FetchReviewsByProduct,
    private readonly fetchReviewsByRatingUseCase: FetchReviewsByRating,
    private readonly fetchReviewsByUserUseCase: FetchReviewsByUser,
    private readonly flagReviewUseCase: FlagReview,
    private readonly updateReviewUseCase: UpdateReview,
    private readonly verifyReviewUseCase: VerifyReview,
  ) {}

  @Mutation(() => ReviewDTO)
  async createReview(
    @Args('reviewDTO') reviewDTO: ReviewDTO,
  ): Promise<ReviewDTO | null> {
    return this.createReviewUseCase.execute(reviewDTO);
  }

  @Mutation(() => Boolean)
  async deleteReview(@Args('id') id: number): Promise<boolean> {
    return this.deleteReviewUseCase.execute(id);
  }

  @Query(() => Number)
  async fetchAverageRating(
    @Args('productId') productId: number,
  ): Promise<number> {
    return this.fetchAverageRatingUseCase.execute(productId);
  }

  @Query(() => [ReviewDTO])
  async fetchFlaggedReviews(): Promise<ReviewDTO[]> {
    return this.fetchFlaggedReviewsUseCase.execute();
  }

  @Query(() => [ReviewDTO])
  async fetchPopularReviews(
    @Args('limit') limit: number,
  ): Promise<ReviewDTO[]> {
    return this.fetchPopularReviewsUseCase.execute(limit);
  }

  @Query(() => ReviewDTO, { nullable: true })
  async fetchReviewById(@Args('id') id: number): Promise<ReviewDTO | null> {
    return this.fetchReviewByIdUseCase.execute(id);
  }

  @Query(() => [ReviewDTO])
  async fetchReviewsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<ReviewDTO[]> {
    return this.fetchReviewsByDateRangeUseCase.execute(startDate, endDate);
  }

  @Query(() => [ReviewDTO])
  async fetchReviewsByProduct(
    @Args('productId') productId: number,
  ): Promise<ReviewDTO[]> {
    return this.fetchReviewsByProductUseCase.execute(productId);
  }

  @Query(() => [ReviewDTO])
  async fetchReviewsByRating(
    @Args('rating') rating: number,
  ): Promise<ReviewDTO[]> {
    return this.fetchReviewsByRatingUseCase.execute(rating);
  }

  @Query(() => [ReviewDTO])
  async fetchReviewsByUser(
    @Args('userId') userId: number,
  ): Promise<ReviewDTO[]> {
    return this.fetchReviewsByUserUseCase.execute(userId);
  }

  @Mutation(() => ReviewDTO, { nullable: true })
  async flagReview(@Args('id') id: number): Promise<ReviewDTO | null> {
    return this.flagReviewUseCase.execute(id);
  }

  @Mutation(() => ReviewDTO, { nullable: true })
  async updateReview(
    @Args('id') id: number,
    @Args('reviewDTO') reviewDTO: ReviewDTO,
  ): Promise<ReviewDTO | null> {
    return this.updateReviewUseCase.execute(id, reviewDTO);
  }

  @Mutation(() => ReviewDTO, { nullable: true })
  async verifyReview(@Args('id') id: number): Promise<ReviewDTO | null> {
    return this.verifyReviewUseCase.execute(id);
  }
}
