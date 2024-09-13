import { IsInt, IsString, IsNumber, IsOptional, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDTO } from './product.dto';
import { UserDTO } from './user.dto';

/**
 * Data Transfer Object for Review.
 * Used for validating and transforming review data in API requests and responses.
 */
export class ReviewDTO {
  /**
   * Unique identifier for the review.
   */
  @IsInt()
  id: number;

  /**
   * Unique identifier for the product associated with this review.
   */
  @IsInt()
  productId: number;

  /**
   * The product associated with this review.
   */
  @ValidateNested()
  @Type(() => ProductDTO)
  product: ProductDTO;
  
  /**
   * Unique identifier for the user who wrote the review.
  */
 @IsInt()
 userId: number;
 
 /**
  * The user who wrote the review.
 */
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  /**
   * Rating given in the review, usually on a scale from 1 to 5.
   */
  @IsNumber()
  rating: number;

  /**
   * Optional comment provided by the user.
   */
  @IsOptional()
  @IsString()
  comment?: string;

  /**
   * The date and time when the review was created.
   */
  @IsDateString()
  createdAt: Date;

  /**
   * Creates a new ReviewDTO instance.
   * @param id - Unique identifier for the review.
   * @param productId - Unique identifier for the associated product.
   * @param product - The product related to this review.
   * @param userId - Unique identifier for the user.
   * @param user - The user who wrote the review.
   * @param rating - Rating given in the review.
   * @param comment - (Optional) Comment provided by the user.
   * @param createdAt - (Optional) Date and time of review creation.
   */
  constructor(
    id: number,
    productId: number,
    product: ProductDTO,
    userId: number,
    user: UserDTO,
    rating: number,
    comment?: string,
    createdAt: Date = new Date()
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
