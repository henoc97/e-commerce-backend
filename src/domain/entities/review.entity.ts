import { Product } from './product.entity';
import { User } from './user.entity';

/**
 * Represents a review for a product.
 * Stores details about the rating, comment, and associated user and product.
 */
export class Review {
  /**
   * Unique identifier for the Review.
   */
  id: number;

  /**
   * Unique identifier for the Product associated with this review.
   */
  productId: number;

  /**
   * The Product that this review is associated with.
   */
  product: Product;

  /**
   * Unique identifier for the User who wrote the review.
   */
  userId: number;

  /**
   * The User who wrote the review.
   */
  user: User;

  /**
   * The rating given in the review, usually on a scale from 1 to 5.
   */
  rating: number;

  /**
   * Optional comment provided by the user.
   */
  comment?: string;

  /**
   * The date and time when the review was created.
   * Automatically set to the current date and time when a Review is created.
   */
  createdAt: Date;

  /**
   * Creates a new Review instance.
   * @param id - Unique identifier for the Review.
   * @param productId - Unique identifier for the Product.
   * @param product - The Product that this review is associated with.
   * @param userId - Unique identifier for the User.
   * @param user - The User who wrote the review.
   * @param rating - The rating given in the review.
   * @param comment - (Optional) Comment provided by the user.
   * @param createdAt - (Optional) Date and time of review creation.
   */
  constructor(
    id: number,
    productId: number,
    product: Product,
    userId: number,
    user: User,
    rating: number,
    comment?: string,
    createdAt: Date = new Date(),
  ) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.userId = userId;
    this.user = user;
    this.rating = rating;
    this.comment = comment;
    this.createdAt = createdAt;
  }
}
