import {
  IsInt,
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDTO } from './product.dto';
import { DiscountType } from '../../domain/enums/discount-type.enum';

/**
 * Data Transfer Object for Promotion.
 * Used for validating and transforming promotion data in API requests and responses.
 */
export class PromotionDTO {
  /**
   * Unique identifier for the promotion.
   */
  @IsInt()
  id: number;

  /**
   * Name of the promotion (e.g., "Summer Sale", "Black Friday Discount").
   */
  @IsString()
  name: string;

  /**
   * Amount or percentage of the discount applied.
   * The interpretation depends on the discountType (e.g., flat amount or percentage).
   */
  @IsNumber()
  discountValue: number;

  /**
   * Type of discount applied (e.g., FLAT_AMOUNT, PERCENTAGE).
   */
  @IsEnum(DiscountType)
  discountType: DiscountType;

  /**
   * The date when the promotion starts.
   */
  @IsDateString()
  startDate: Date;

  /**
   * The date when the promotion ends.
   */
  @IsDateString()
  endDate: Date;

  /**
   * Unique identifier for the product that the promotion applies to.
   */
  @IsInt()
  productId: number;

  /**
   * The product associated with the promotion.
   */
  @ValidateNested()
  @Type(() => ProductDTO)
  product: ProductDTO;

  /**
   * Date and time when the promotion was created.
   */
  @IsDateString()
  createdAt: Date;

  /**
   * Date and time when the promotion was last updated.
   */
  @IsDateString()
  updatedAt: Date;

  /**
   * Creates a new PromotionDTO instance.
   * @param id - Unique identifier for the promotion.
   * @param name - Name of the promotion.
   * @param discountValue - Amount or percentage of the discount.
   * @param discountType - Type of the discount.
   * @param startDate - Start date of the promotion.
   * @param endDate - End date of the promotion.
   * @param productId - Unique identifier for the product.
   * @param product - The product associated with the promotion.
   * @param createdAt - (Optional) Date and time of promotion creation.
   * @param updatedAt - (Optional) Date and time of the last update.
   */
  constructor(
    id: number,
    name: string,
    discountValue: number,
    discountType: DiscountType,
    startDate: Date,
    endDate: Date,
    productId: number,
    product: ProductDTO,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.name = name;
    this.discountValue = discountValue;
    this.discountType = discountType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.productId = productId;
    this.product = product;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
