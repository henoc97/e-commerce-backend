import { fromReviewPrisma } from 'src/application/helper/from-prisma/to.review.entity';
import { Review } from 'src/domain/entities/review.entity';
import { IReviewRepository } from 'src/domain/repositories/review.repository';
import prisma from 'prisma/prisma.service';

/**
 * Repository for handling Review-related operations using Prisma ORM.
 */
export class ReviewRepository implements IReviewRepository {


  /**
   * Creates a new review.
   * @param review - The review entity to create.
   * @returns A promise that resolves to the created review.
   */
  async create(review: Review): Promise<Review> {
    try {
      const { id, product, user, ...data } = review;
      const result = await prisma.review.create({
        data: data,
      });
      return fromReviewPrisma(result);
    } catch (error) {
      console.error('Error creating review:', error);
      throw new Error('Could not create review, error: ' + error);
    }
  }

  /**
   * Retrieves a review by its ID.
   * @param id - The unique identifier of the review.
   * @returns A promise that resolves to the review or null if not found.
   */
  async getById(id: number): Promise<Review | null> {
    try {
      const result = await prisma.review.findUnique({
        where: { id },
      });
      return fromReviewPrisma(result);
    } catch (error) {
      console.error('Error retrieving review by ID:', error);
      throw new Error('Could not retrieve review, error: ' + error);
    }
  }

  /**
   * Updates an existing review.
   * @param id - The ID of the review to modify.
   * @param updates - The fields to update in the review.
   * @returns A promise that resolves to the updated review.
   */
  async modify(id: number, updates: Partial<Review>): Promise<Review> {
    try {
      const { id, product, user, ...data } = updates;
      const result = await prisma.review.update({
        where: { id },
        data: data,
      });
      return fromReviewPrisma(result);
    } catch (error) {
      console.error('Error updating review:', error);
      throw new Error('Could not update review, error: ' + error);
    }
  }

  /**
   * Deletes a review by its ID.
   * @param id - The ID of the review to delete.
   * @returns A promise that resolves to true if the review was deleted, false otherwise.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await prisma.review.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      return false;
    }
  }

  /**
   * Retrieves all reviews for a specific product.
   * @param productId - The ID of the product.
   * @returns A promise that resolves to an array of reviews.
   */
  async getByProduct(productId: number): Promise<Review[]> {
    try {
      const result = await prisma.review.findMany({
        where: { productId },
      });
      return result.map(fromReviewPrisma);
    } catch (error) {
      console.error('Error retrieving reviews for product:', error);
      throw new Error('Could not retrieve product reviews, error: ' + error);
    }
  }

  /**
   * Retrieves all reviews made by a specific user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to an array of reviews.
   */
  async getByUser(userId: number): Promise<Review[]> {
    try {
      const result = await prisma.review.findMany({
        where: { userId },
      });
      return result.map(fromReviewPrisma);
    } catch (error) {
      console.error('Error retrieving reviews for user:', error);
      throw new Error('Could not retrieve user reviews, error: ' + error);
    }
  }

  /**
   * Retrieves reviews that match a specific rating.
   * @param rating - The rating to filter by.
   * @returns A promise that resolves to an array of reviews.
   */
  async getByRating(rating: number): Promise<Review[]> {
    try {
      const result = await prisma.review.findMany({
        where: { rating },
      });
      return result.map(fromReviewPrisma);
    } catch (error) {
      console.error('Error retrieving reviews by rating:', error);
      throw new Error('Could not retrieve reviews by rating, error: ' + error);
    }
  }

  /**
   * Retrieves reviews within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of reviews.
   */
  async getByDateRange(startDate: Date, endDate: Date): Promise<Review[]> {
    try {
      const result = await prisma.review.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return result.map(fromReviewPrisma);
    } catch (error) {
      console.error('Error retrieving reviews by date range:', error);
      throw new Error(
        'Could not retrieve reviews by date range, error: ' + error,
      );
    }
  }

  /**
   * Marks a review as verified.
   * @param id - The ID of the review to verify.
   * @returns A promise that resolves to the verified review.
   */
  async verify(id: number): Promise<Review> {
    try {
      const result = await prisma.review.update({
        where: { id },
        data: { verified: true }, // Assuming there's a 'verified' field in your Review model
      });
      return fromReviewPrisma(result); // Convert the Prisma result to your Review entity
    } catch (error) {
      console.error('Error verifying review:', error);
      throw error;
    }
  }

  /**
   * Flags a review for further inspection.
   * @param id - The ID of the review to flag.
   * @returns A promise that resolves to the flagged review.
   */
  async flag(id: number): Promise<Review> {
    try {
      const result = await prisma.review.update({
        where: { id },
        data: { flagged: true }, // Assuming there's a 'flagged' field in your Review model
      });
      return fromReviewPrisma(result); // Convert the Prisma result to your Review entity
    } catch (error) {
      console.error('Error flagging review:', error);
      throw error;
    }
  }

  /**
   * Retrieves all flagged reviews.
   * @returns A promise that resolves to an array of flagged reviews.
   */
  async getFlagged(): Promise<Review[]> {
    try {
      const result = await prisma.review.findMany({
        where: { flagged: true }, // Assuming 'flagged' is the field used to mark reviews
      });
      return result.map(fromReviewPrisma); // Convert each Prisma result to your Review entity
    } catch (error) {
      console.error('Error retrieving flagged reviews:', error);
      throw error;
    }
  }

  /**
   * Retrieves the most popular reviews, limited by the provided number.
   * @param limit - The maximum number of reviews to return.
   * @returns A promise that resolves to an array of popular reviews.
   */
  async getPopular(limit: number): Promise<Review[]> {
    try {
      const result = await prisma.review.findMany({
        orderBy: { rating: 'desc' },
        take: limit,
      });
      return result.map(fromReviewPrisma);
    } catch (error) {
      console.error('Error retrieving popular reviews:', error);
      throw new Error('Could not retrieve popular reviews, error: ' + error);
    }
  }

  /**
   * Retrieves the average rating for a specific product.
   * @param productId - The ID of the product.
   * @returns A promise that resolves to the average rating of the product.
   */
  async getAverageRating(productId: number): Promise<number> {
    try {
      const reviews = await prisma.review.findMany({
        where: { productId },
        select: { rating: true },
      });
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0,
      );
      return reviews.length > 0 ? totalRating / reviews.length : 0;
    } catch (error) {
      console.error('Error calculating average rating:', error);
      throw new Error('Could not calculate average rating, error: ' + error);
    }
  }
}
