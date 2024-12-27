import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VendorDTO } from './vendor.dto';
import { Currency } from '../../domain/enums/currencies.enum';

/**
 * Data Transfer Object for Subscription.
 * Used for validating and transforming subscription data in API requests and responses.
 */
export class SubscriptionDTO {
  /**
   * Unique identifier for the subscription.
   */
  @IsInt()
  id: number;

  /**
   * Name of the subscription plan (e.g., "Basic Plan", "Premium Plan").
   */
  @IsString()
  name: string;

  /**
   * Optional description of the subscription plan.
   * Provides additional details about the features or benefits of the plan.
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Price of the subscription plan.
   * Represents the cost associated with the subscription.
   */
  @IsNumber()
  price: number;

  @IsEnum(Currency)
  currency: Currency;

  /**
   * Duration of the subscription in days.
   * Defines the validity period of the subscription.
   */
  @IsInt()
  duration: number;

  /**
   * Optional list of vendors associated with this subscription.
   * Represents vendors that have subscribed to this plan.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendorDTO)
  vendors?: VendorDTO[];

  /**
   * The date and time when the subscription was created.
   */
  @IsDateString()
  createdAt: Date;

  /**
   * The date and time when the subscription was last updated.
   */
  @IsDateString()
  updatedAt: Date;

  /**
   * Creates a new SubscriptionDTO instance.
   * @param id - Unique identifier for the subscription.
   * @param name - Name of the subscription plan.
   * @param price - Price of the subscription plan.
   * @param duration - Duration of the subscription in days.
   * @param description - (Optional) Description of the subscription plan.
   * @param vendors - (Optional) List of vendors associated with the subscription.
   * @param createdAt - (Optional) Date and time of subscription creation.
   * @param updatedAt - (Optional) Date and time of the last update.
   */
  constructor(
    id: number,
    name: string,
    price: number,
    currency: Currency,
    duration: number,
    description?: string,
    vendors: VendorDTO[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency
    this.duration = duration;
    this.description = description;
    this.vendors = vendors;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
