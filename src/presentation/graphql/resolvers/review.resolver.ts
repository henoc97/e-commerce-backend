import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { transformReviewDTOToGraphQL } from 'src/application/helper/utils/transformers';
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
import { Review, ReviewInput } from 'src/generated/graphql';
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
  ) { }

  @Mutation(() => ReviewDTO)
  async createReview(
    @Args('reviewDTO') reviewDTO: ReviewDTO,
  ): Promise<Review | null> {
    const result = await this.createReviewUseCase.execute(reviewDTO);
    return transformReviewDTOToGraphQL(result);
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
  async fetchFlaggedReviews(): Promise<Review[]> {
    const result = await this.fetchFlaggedReviewsUseCase.execute();
    return result.map(transformReviewDTOToGraphQL);
  }

  @Query(() => [ReviewDTO])
  async fetchPopularReviews(
    @Args('limit') limit: number,
  ): Promise<Review[]> {
    const result = await this.fetchPopularReviewsUseCase.execute(limit);
    return result.map(transformReviewDTOToGraphQL);
  }

  @Query(() => ReviewDTO, { nullable: true })
  async fetchReviewById(@Args('id') id: number): Promise<Review | null> {
    const result = await this.fetchReviewByIdUseCase.execute(id);
    return transformReviewDTOToGraphQL(result);
  }

  @Query(() => [ReviewDTO])
  async fetchReviewsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<Review[]> {
    const result = await this.fetchReviewsByDateRangeUseCase.execute(startDate, endDate);
    return result.map(transformReviewDTOToGraphQL);
  }

  @Query(() => [ReviewDTO])
  async fetchReviewsByProduct(
    @Args('productId') productId: number,
  ): Promise<Review[]> {
    const result = await this.fetchReviewsByProductUseCase.execute(productId);
    return result.map(transformReviewDTOToGraphQL);
  }

  @Query(() => [ReviewDTO])
  async fetchReviewsByRating(
    @Args('rating') rating: number,
  ): Promise<Review[]> {
    const result = await this.fetchReviewsByRatingUseCase.execute(rating);
    return result.map(transformReviewDTOToGraphQL);
  }

  @Query(() => [ReviewDTO])
  async fetchReviewsByUser(
    @Args('userId') userId: number,
  ): Promise<Review[]> {
    const result = await this.fetchReviewsByUserUseCase.execute(userId);
    return result.map(transformReviewDTOToGraphQL);
  }

  @Mutation(() => ReviewDTO, { nullable: true })
  async flagReview(@Args('id') id: number): Promise<Review | null> {
    const result = await this.flagReviewUseCase.execute(id);
    return transformReviewDTOToGraphQL(result);
  }

  @Mutation(() => ReviewDTO, { nullable: true })
  async updateReview(
    @Args('id') id: number,
    @Args('reviewDTO') review: ReviewInput,
  ): Promise<Review | null> {
    const dto = toReviewDTO(review);
    const result = await this.updateReviewUseCase.execute(id, dto);
    return transformReviewDTOToGraphQL(result);
  }

  @Mutation(() => ReviewDTO, { nullable: true })
  async verifyReview(@Args('id') id: number): Promise<Review | null> {
    const result = await this.verifyReviewUseCase.execute(id);
    return transformReviewDTOToGraphQL(result);
  }
}
