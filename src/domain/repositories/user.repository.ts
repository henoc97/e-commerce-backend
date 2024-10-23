import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { Order } from '../entities/order.entity';
import { UserRole } from '../enums/user-role.enum';
import { UserActivityAction } from '../enums/user-activity-action.enum';
import { Subsite } from '../entities/Subsite.entity';
import { Ticket } from '../entities/ticket.entity';
import { UserActivity } from '../entities/user-activity.entity';
import { Review } from '../entities/review.entity';
import { UserProfile } from '../entities/user-profile.entity';
import { AuditLog } from '../entities/audit-log.entity';
import { Cart } from '../entities/cart.entity';
import { Notification } from '../entities/notification.entity';

/**
 * Interface defining operations for managing User entities.
 */
export interface IUserRepository {
  /**
   * Creates a new user.
   * @param user - The User entity to create.
   * @returns The created User entity.
   */
  create(user: User): Promise<User>;

  /**
   * Retrieves a user by their unique ID.
   * @param id - The unique ID of the user.
   * @returns The User entity if found, otherwise null.
   */
  getById(id: number): Promise<User | null>;

  /**
   * Updates an existing user with new data.
   * @param id - The unique ID of the user.
   * @param updates - The data to update in the User entity.
   * @returns The updated User entity.
   */
  update(id: number, updates: Partial<User>): Promise<User>;

  /**
   * Deletes a user by their unique ID.
   * @param id - The unique ID of the user.
   * @returns True if the deletion was successful, otherwise false.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Finds users by their role.
   * @param role - The role to filter users by.
   * @returns An array of User entities with the specified role.
   */
  getByRole(role: UserRole): Promise<User[]>;

  /**
   * Finds a user by their email address.
   * @param email - The email address to search for.
   * @returns The User entity if found, otherwise null.
   */
  getByEmail(email: string): Promise<User | null>;

  /**
   * Updates a user's password.
   * @param userId - The unique ID of the user.
   * @param newPassword - The new password to set.
   * @returns The updated User entity.
   */
  updatePassword(userId: number, newPassword: string): Promise<User>;

  /**
   * Retrieves the count of active users.
   * @returns The number of active users.
   */
  getActiveCount(): Promise<number>;

  /**
   * Retrieves the count of users by role.
   * @param role - The role to filter users by.
   * @returns The number of users with the specified role.
   */
  getCountByRole(role: UserRole): Promise<number>;

  /**
   * Finds users who have been inactive for a specified number of days.
   * @param days - The number of days of inactivity.
   * @returns An array of User entities who have been inactive for the specified number of days.
   */
  getInactiveUsers(days: number): Promise<User[]>;
}
