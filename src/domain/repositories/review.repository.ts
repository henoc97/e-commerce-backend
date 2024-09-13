import { Review } from '../entities/review.entity';

/**
 * Repository interface for managing reviews with enhanced business logic.
 */
export interface IReviewRepository {
  /**
   * Creates a new review.
   * @param review - The Review object to be created.
   * @returns The created Review object.
   */
  create(review: Review): Promise<Review>;

  /**
   * Retrieves a review by its ID.
   * @param id - The ID of the review.
   * @returns The Review object if found, otherwise null.
   */
  getById(id: number): Promise<Review | null>;

  /**
   * Updates a review.
   * @param id - The ID of the review.
   * @param updates - The fields to update.
   * @returns The updated Review object.
   */
  modify(id: number, updates: Partial<Review>): Promise<Review>;

  /**
   * Deletes a review.
   * @param id - The ID of the review.
   * @returns True if the review was deleted successfully.
   */
  remove(id: number): Promise<boolean>;

  /**
   * Retrieves all reviews for a product.
   * @param productId - The ID of the product.
   * @returns An array of reviews for the product.
   */
  getByProduct(productId: number): Promise<Review[]>;

  /**
   * Retrieves all reviews written by a user.
   * @param userId - The ID of the user.
   * @returns An array of reviews by the user.
   */
  getByUser(userId: number): Promise<Review[]>;

  /**
   * Retrieves reviews by rating.
   * @param rating - The rating to filter reviews by.
   * @returns An array of reviews with the specified rating.
   */
  getByRating(rating: number): Promise<Review[]>;

  /**
   * Retrieves reviews within a date range.
   * @param startDate - The start date.
   * @param endDate - The end date.
   * @returns An array of reviews created within the date range.
   */
  getByDateRange(startDate: Date, endDate: Date): Promise<Review[]>;

  /**
   * Marks a review as verified, indicating that it has been validated.
   * @param id - The ID of the review to verify.
   * @returns The updated Review object with verified status.
   */
  verify(id: number): Promise<Review>;

  /**
   * Flags a review for moderation (e.g., due to inappropriate content).
   * @param id - The ID of the review to flag.
   * @returns The flagged Review object.
   */
  flag(id: number): Promise<Review>;

  /**
   * Retrieves all flagged reviews for moderation.
   * @returns An array of flagged reviews.
   */
  getFlagged(): Promise<Review[]>;

  /**
   * Retrieves the most popular reviews based on certain criteria (e.g., number of likes, interactions).
   * @param limit - The maximum number of popular reviews to retrieve.
   * @returns An array of popular reviews.
   */
  getPopular(limit: number): Promise<Review[]>;

  /**
   * Calculates the average rating for a specific product based on its reviews.
   * @param productId - The ID of the product.
   * @returns The average rating for the product.
   */
  getAverageRating(productId: number): Promise<number>;
}
