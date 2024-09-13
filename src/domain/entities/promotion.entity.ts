import { DiscountType } from '../enums/discount-type.enum';
import { Product } from './product.entity';

/**
 * Represents a promotional offer for a product.
 * Stores details about the promotion, including discount value, type, and validity period.
 */
export class Promotion {
  /**
   * Unique identifier for the promotion.
   */
  id: number;

  /**
   * Name of the promotion (e.g., "Summer Sale", "Black Friday Discount").
   */
  name: string;

  /**
   * The amount or percentage of the discount applied.
   * The interpretation depends on the discountType (e.g., flat amount or percentage).
   */
  discountValue: number;

  /**
   * Type of discount applied (e.g., FLAT_AMOUNT, PERCENTAGE).
   */
  discountType: DiscountType;

  /**
   * The date when the promotion starts.
   */
  startDate: Date;

  /**
   * The date when the promotion ends.
   */
  endDate: Date;

  /**
   * Unique identifier for the product that the promotion applies to.
   */
  productId: number;

  /**
   * The product associated with the promotion.
   */
  product: Product;

  /**
   * The date and time when the promotion was created.
   * Automatically set to the current date and time when the promotion is created.
   */
  createdAt: Date;

  /**
   * The date and time when the promotion was last updated.
   * Automatically set to the current date and time when the promotion is updated.
   */
  updatedAt: Date;

  /**
   * Creates a new Promotion instance.
   * @param id - Unique identifier for the promotion.
   * @param name - Name of the promotion.
   * @param discountValue - The amount or percentage of the discount.
   * @param discountType - The type of discount.
   * @param startDate - The start date of the promotion.
   * @param endDate - The end date of the promotion.
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
    product: Product,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
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
