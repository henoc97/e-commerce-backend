import { Vendor } from './vendor.entity';

/**
 * Represents a subscription plan available to vendors.
 * Stores details about the subscription, including pricing, duration, and associated vendors.
 */
export class Subscription {
  /**
   * Unique identifier for the subscription.
   */
  id: number;

  /**
   * Name of the subscription plan (e.g., "Basic Plan", "Premium Plan").
   */
  name: string;

  /**
   * Description of the subscription plan (optional).
   * Provides additional details about the features or benefits of the plan.
   */
  description?: string;

  /**
   * Price of the subscription plan.
   * Represents the cost associated with the subscription.
   */
  price: number;

  /**
   * Duration of the subscription in days.
   * Defines the validity period of the subscription.
   */
  duration: number;

  /**
   * List of vendors associated with this subscription.
   * Represents vendors that have subscribed to this plan.
   */
  vendors: Vendor[];

  /**
   * The date and time when the subscription was created.
   * Automatically set to the current date and time when the subscription is created.
   */
  createdAt: Date;

  /**
   * The date and time when the subscription was last updated.
   * Automatically set to the current date and time when the subscription is updated.
   */
  updatedAt: Date;

  /**
   * Creates a new Subscription instance.
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
    duration: number,
    description?: string,
    vendors: Vendor[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.vendors = vendors;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
