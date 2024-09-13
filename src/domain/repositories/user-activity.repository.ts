import { UserActivity } from '../entities/user-activity.entity';

/**
 * Defines the contract for managing user activities.
 */
export interface IUserActivityRepository {
  /**
   * Records a new user activity.
   * @param activity - The user activity entity to be recorded.
   * @returns The recorded user activity entity.
   */
  create(activity: UserActivity): Promise<UserActivity>;

  /**
   * Finds an activity by its ID.
   * @param id - The ID of the activity.
   * @returns The activity entity if found, otherwise null.
   */
  findById(id: number): Promise<UserActivity | null>;

  /**
   * Lists activities for a specific user.
   * @param userId - The ID of the user.
   * @returns An array of activities associated with the user.
   */
  listByUser(userId: number): Promise<UserActivity[]>;

  /**
   * Lists activities related to a specific product.
   * @param productId - The ID of the product.
   * @returns An array of activities related to the product.
   */
  listByProduct(productId: number): Promise<UserActivity[]>;

  /**
   * Updates an existing activity record.
   * @param id - The ID of the activity to update.
   * @param activity - The updated activity entity.
   * @returns The updated activity entity.
   */
  update(id: number, activity: UserActivity): Promise<UserActivity>;

  /**
   * Deletes an activity by its ID.
   * @param id - The ID of the activity to delete.
   * @returns True if the deletion was successful, otherwise false.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Retrieves activities within a specific time range.
   * @param start - The start date and time.
   * @param end - The end date and time.
   * @returns An array of activities within the range.
   */
  listByDateRange(start: Date, end: Date): Promise<UserActivity[]>;

  /**
   * Validates the activity data.
   * @param activity - The activity entity to validate.
   * @returns True if the activity is valid, otherwise false.
   */
  validate(activity: UserActivity): Promise<boolean>;

  /**
   * Retrieves the count of activities for a specific user.
   * @param userId - The ID of the user.
   * @returns The count of activities for the user.
   */
  countByUser(userId: number): Promise<number>;

  /**
   * Retrieves the most recent activities for a specific user.
   * @param userId - The ID of the user.
   * @param limit - The maximum number of activities to retrieve.
   * @returns An array of the most recent activities for the user.
   */
  getRecentByUser(userId: number, limit: number): Promise<UserActivity[]>;
}
