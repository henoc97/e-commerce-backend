import { PrismaService } from 'prisma/prisma.service';
import { fromUserActivityPrisma } from 'src/application/helper/from-prisma/to.user-activity.entity';
import { UserActivity } from 'src/domain/entities/user-activity.entity';
import { IUserActivityRepository } from 'src/domain/repositories/user-activity.repository';

/**
 * UserActivityRepository provides access to user activity data in the database.
 * It implements the IUserActivityRepository interface to perform CRUD operations.
 */
export class UserActivityRepository implements IUserActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new user activity record in the database.
   * @param activity - The user activity to create.
   * @returns The created UserActivity instance.
   */
  async create(activity: UserActivity): Promise<UserActivity> {
    try {
      const { id, user, ...data } = activity;
      const newActivity = await this.prisma.userActivity.create({
        data: data,
      });
      return fromUserActivityPrisma(newActivity);
    } catch (error) {
      console.error('Error creating user activity:', error);
      throw new Error('Unable to create user activity.');
    }
  }

  /**
   * Finds a user activity record by its ID.
   * @param id - Unique identifier for the user activity.
   * @returns The UserActivity instance or null if not found.
   */
  async findById(id: number): Promise<UserActivity | null> {
    try {
      const activity = await this.prisma.userActivity.findUnique({
        where: { id },
      });
      return fromUserActivityPrisma(activity);
    } catch (error) {
      console.error('Error finding user activity by ID:', error);
      throw new Error('Unable to find user activity.');
    }
  }

  /**
   * Lists all user activities for a specific user.
   * @param userId - Unique identifier for the user.
   * @returns An array of UserActivity instances.
   */
  async listByUser(userId: number): Promise<UserActivity[]> {
    try {
      const activities = await this.prisma.userActivity.findMany({
        where: { userId },
      });
      return activities.map(fromUserActivityPrisma);
    } catch (error) {
      console.error('Error listing user activities:', error);
      throw new Error('Unable to list user activities.');
    }
  }

  /**
   * Lists all user activities related to a specific product.
   * @param productId - Unique identifier for the product.
   * @returns An array of UserActivity instances related to the product.
   */
  async listByProduct(productId: number): Promise<UserActivity[]> {
    try {
      const activities = await this.prisma.userActivity.findMany({
        where: { productId },
      });
      return activities.map(fromUserActivityPrisma);
    } catch (error) {
      console.error('Error listing user activities by product:', error);
      throw new Error('Unable to list user activities by product.');
    }
  }

  /**
   * Updates a user activity record.
   * @param id - Unique identifier for the user activity to update.
   * @param activity - The updated user activity details.
   * @returns The updated UserActivity instance.
   */
  async update(id: number, activity: UserActivity): Promise<UserActivity> {
    try {
      const { user, ...data } = activity;
      const updatedActivity = await this.prisma.userActivity.update({
        where: { id },
        data: data,
      });
      return fromUserActivityPrisma(updatedActivity);
    } catch (error) {
      console.error('Error updating user activity:', error);
      throw new Error('Unable to update user activity.');
    }
  }

  /**
   * Deletes a user activity record by its ID.
   * @param id - Unique identifier for the user activity to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.userActivity.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting user activity:', error);
      return false;
    }
  }

  /**
   * Lists user activities within a specified date range.
   * @param start - Start date of the range.
   * @param end - End date of the range.
   * @returns An array of UserActivity instances within the date range.
   */
  async listByDateRange(start: Date, end: Date): Promise<UserActivity[]> {
    try {
      const activities = await this.prisma.userActivity.findMany({
        where: {
          timestamp: {
            gte: start,
            lte: end,
          },
        },
      });
      return activities.map(fromUserActivityPrisma);
    } catch (error) {
      console.error('Error listing user activities by date range:', error);
      throw new Error('Unable to list user activities by date range.');
    }
  }

  /**
   * Validates a user activity record based on specific criteria.
   * @param activity - The user activity to validate.
   * @returns A boolean indicating whether the activity is valid.
   */
  async validate(activity: UserActivity): Promise<boolean> {
    try {
      // Implement validation logic here, returning true or false.
      return true; // Placeholder implementation
    } catch (error) {
      console.error('Error validating user activity:', error);
      throw new Error('Unable to validate user activity.');
    }
  }

  /**
   * Counts the total number of user activities for a specific user.
   * @param userId - Unique identifier for the user.
   * @returns The count of user activities.
   */
  async countByUser(userId: number): Promise<number> {
    try {
      return await this.prisma.userActivity.count({
        where: { userId },
      });
    } catch (error) {
      console.error('Error counting user activities:', error);
      throw new Error('Unable to count user activities.');
    }
  }

  /**
   * Retrieves recent user activities for a specific user, limited by the specified number.
   * @param userId - Unique identifier for the user.
   * @param limit - The maximum number of activities to return.
   * @returns An array of recent UserActivity instances.
   */
  async getRecentByUser(
    userId: number,
    limit: number,
  ): Promise<UserActivity[]> {
    try {
      const activities = await this.prisma.userActivity.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: limit,
      });
      return activities.map(fromUserActivityPrisma);
    } catch (error) {
      console.error('Error getting recent user activities:', error);
      throw new Error('Unable to retrieve recent user activities.');
    }
  }
}
