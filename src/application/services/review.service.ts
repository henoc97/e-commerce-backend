import { Injectable, Inject } from '@nestjs/common';
import { Review } from '../../domain/entities/review.entity';
import { IReviewRepository } from '../../domain/repositories/review.repository';
import { ReviewDTO } from '../../presentation/dtos/review.dto';
import { fromReviewDTO } from '../helper/to-entity/to.review.entity';
import { KafkaProducerService } from '../../infrastructure/external-services/kafka/services/kafka-producer.service';
/**
 * Service for managing product reviews.
 * Provides methods to handle review-related operations such as creation, retrieval, and updating.
 */
@Injectable()
export class ReviewService {
  constructor(
    @Inject('IReviewRepository') private readonly reviewRepository: IReviewRepository,
    private readonly kafkaProducerService: KafkaProducerService,

  ) { }

  /**
   * Creates a new review.
   * @param reviewDTO - The ReviewDTO object containing review details.
   * @returns The created Review entity.
   */
  async createReview(reviewDTO: ReviewDTO): Promise<Review> {
    const review = fromReviewDTO(reviewDTO);
    const result = await this.reviewRepository.create(review);
    if (result) this.kafkaProducerService.emitEvent('review.created', JSON.stringify(result));
    return result;
  }

  /**
   * Retrieves a review by its ID.
   * @param id - The ID of the review to retrieve.
   * @returns The Review entity if found, otherwise null.
   */
  async getReviewById(id: number): Promise<Review | null> {
    return await this.reviewRepository.getById(id);
  }

  /**
   * Updates a review's details.
   * @param id - The ID of the review to update.
   * @param updates - The fields to update.
   * @returns The updated Review entity.
   */
  async updateReview(id: number, updates: Partial<ReviewDTO>): Promise<Review> {
    const updateReview = fromReviewDTO(updates);
    const result = this.reviewRepository.modify(id, updateReview);
    if (result) this.kafkaProducerService.emitEvent('review.updated', JSON.stringify(result));
    return result;
  }

  /**
   * Deletes a review.
   * @param id - The ID of the review to delete.
   * @returns True if the deletion was successful, false otherwise.
   */
  async deleteReview(id: number): Promise<boolean> {
    return await this.reviewRepository.remove(id);
  }

  /**
   * Retrieves all reviews for a specific product.
   * @param productId - The ID of the product to retrieve reviews for.
   * @returns An array of Review entities for the specified product.
   */
  async getReviewsByProduct(productId: number): Promise<Review[]> {
    return await this.reviewRepository.getByProduct(productId);
  }

  /**
   * Retrieves all reviews written by a specific user.
   * @param userId - The ID of the user to retrieve reviews for.
   * @returns An array of Review entities written by the specified user.
   */
  async getReviewsByUser(userId: number): Promise<Review[]> {
    return await this.reviewRepository.getByUser(userId);
  }

  /**
   * Retrieves reviews by their rating.
   * @param rating - The rating to filter reviews by.
   * @returns An array of Review entities with the specified rating.
   */
  async getReviewsByRating(rating: number): Promise<Review[]> {
    return await this.reviewRepository.getByRating(rating);
  }

  /**
   * Retrieves reviews within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns An array of Review entities created within the date range.
   */
  async getReviewsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Review[]> {
    return await this.reviewRepository.getByDateRange(startDate, endDate);
  }

  /**
   * Marks a review as verified.
   * @param id - The ID of the review to verify.
   * @returns The updated Review entity with verified status.
   */
  async verifyReview(id: number): Promise<Review> {
    return await this.reviewRepository.verify(id);
  }

  /**
   * Flags a review for moderation.
   * @param id - The ID of the review to flag.
   * @returns The flagged Review entity.
   */
  async flagReview(id: number): Promise<Review> {
    return await this.reviewRepository.flag(id);
  }

  /**
   * Retrieves all flagged reviews for moderation.
   * @returns An array of flagged Review entities.
   */
  async getFlaggedReviews(): Promise<Review[]> {
    return await this.reviewRepository.getFlagged();
  }

  /**
   * Retrieves the most popular reviews.
   * @param limit - The maximum number of popular reviews to retrieve.
   * @returns An array of the most popular Review entities.
   */
  async getPopularReviews(limit: number): Promise<Review[]> {
    return await this.reviewRepository.getPopular(limit);
  }

  /**
   * Calculates the average rating for a specific product.
   * @param productId - The ID of the product to calculate the average rating for.
   * @returns The average rating for the specified product.
   */
  async getAverageRating(productId: number): Promise<number> {
    return await this.reviewRepository.getAverageRating(productId);
  }
}
