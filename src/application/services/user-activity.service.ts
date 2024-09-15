import { UserActivity } from 'src/domain/entities/user-activity.entity';
import { IUserActivityRepository } from 'src/domain/repositories/user-activity.repository';
import { UserActivityDTO } from 'src/presentation/dtos/user-activity.dto';
import { fromUserActivityDTO } from '../helper/to-entity/to.user-activity.entity';

/**
 * Service for managing user activities.
 * Implements the business logic for user activity use cases.
 */
export class UserActivityService {
  constructor(
    private readonly userActivityRepository: IUserActivityRepository,
  ) {}

  /**
   * Records a new user activity.
   * @param activityDTO - Data Transfer Object containing the activity details.
   * @returns The recorded UserActivity entity.
   */
  async recordActivity(activityDTO: UserActivityDTO): Promise<UserActivity> {
    // Convert DTO to entity
    const activity = fromUserActivityDTO(activityDTO);

    // Use repository to create a new activity record
    return await this.userActivityRepository.create(activity);
  }

  /**
   * Finds an activity by its ID.
   * @param id - The ID of the activity to retrieve.
   * @returns The UserActivity entity if found, otherwise null.
   */
  async getActivityById(id: number): Promise<UserActivity | null> {
    return await this.userActivityRepository.findById(id);
  }

  /**
   * Lists activities for a specific user.
   * @param userId - The ID of the user whose activities are to be listed.
   * @returns An array of UserActivity entities associated with the user.
   */
  async listActivitiesByUser(userId: number): Promise<UserActivity[]> {
    return await this.userActivityRepository.listByUser(userId);
  }

  /**
   * Lists activities related to a specific product.
   * @param productId - The ID of the product whose activities are to be listed.
   * @returns An array of UserActivity entities related to the product.
   */
  async listActivitiesByProduct(productId: number): Promise<UserActivity[]> {
    return await this.userActivityRepository.listByProduct(productId);
  }

  /**
   * Updates an existing activity record.
   * @param id - The ID of the activity to update.
   * @param activityDTO - Data Transfer Object containing the updated activity details.
   * @returns The updated UserActivity entity.
   */
  async updateActivity(
    id: number,
    activityDTO: Partial<UserActivityDTO>,
  ): Promise<UserActivity> {
    // Convert DTO to entity with updated details
    const updatedActivity = fromUserActivityDTO(activityDTO);

    // Use repository to update the activity record
    return await this.userActivityRepository.update(id, updatedActivity);
  }

  /**
   * Deletes an activity by its ID.
   * @param id - The ID of the activity to delete.
   * @returns True if the deletion was successful, otherwise false.
   */
  async deleteActivity(id: number): Promise<boolean> {
    return await this.userActivityRepository.delete(id);
  }

  /**
   * Retrieves activities within a specific time range.
   * @param start - The start date and time of the range.
   * @param end - The end date and time of the range.
   * @returns An array of UserActivity entities within the specified range.
   */
  async listActivitiesByDateRange(
    start: Date,
    end: Date,
  ): Promise<UserActivity[]> {
    return await this.userActivityRepository.listByDateRange(start, end);
  }

  /**
   * Validates the activity data.
   * @param activityDTO - Data Transfer Object containing the activity details to validate.
   * @returns True if the activity data is valid, otherwise false.
   */
  async validateActivity(activityDTO: UserActivityDTO): Promise<boolean> {
    const activity = fromUserActivityDTO(activityDTO);

    return await this.userActivityRepository.validate(activity);
  }

  /**
   * Retrieves the count of activities for a specific user.
   * @param userId - The ID of the user.
   * @returns The count of activities associated with the user.
   */
  async countActivitiesByUser(userId: number): Promise<number> {
    return await this.userActivityRepository.countByUser(userId);
  }

  /**
   * Retrieves the most recent activities for a specific user.
   * @param userId - The ID of the user.
   * @param limit - The maximum number of recent activities to retrieve.
   * @returns An array of the most recent UserActivity entities for the user.
   */
  async getRecentActivitiesByUser(
    userId: number,
    limit: number,
  ): Promise<UserActivity[]> {
    return await this.userActivityRepository.getRecentByUser(userId, limit);
  }
}
