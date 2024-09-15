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
   * Adds an address to a user's profile.
   * @param userId - The unique ID of the user.
   * @param address - The Address entity to add.
   * @returns The updated User entity.
   */
  addAddress(userId: number, address: Address): Promise<User>;

  /**
   * Removes an address from a user's profile.
   * @param userId - The unique ID of the user.
   * @param addressId - The unique ID of the address to remove.
   * @returns The updated User entity.
   */
  removeAddress(userId: number, addressId: number): Promise<User>;

  /**
   * Adds an order to a user's profile.
   * @param userId - The unique ID of the user.
   * @param order - The Order entity to add.
   * @returns The updated User entity.
   */
  addOrder(userId: number, order: Order): Promise<User>;

  /**
   * Removes an order from a user's profile.
   * @param userId - The unique ID of the user.
   * @param orderId - The unique ID of the order to remove.
   * @returns The updated User entity.
   */
  removeOrder(userId: number, orderId: number): Promise<User>;

  /**
   * Adds a notification to a user's profile.
   * @param userId - The unique ID of the user.
   * @param notification - The Notification entity to add.
   * @returns The updated User entity.
   */
  addNotification(userId: number, notification: Notification): Promise<User>;

  /**
   * Removes a notification from a user's profile.
   * @param userId - The unique ID of the user.
   * @param notificationId - The unique ID of the notification to remove.
   * @returns The updated User entity.
   */
  removeNotification(userId: number, notificationId: number): Promise<User>;

  /**
   * Adds a sub-site to a user's profile.
   * @param userId - The unique ID of the user.
   * @param Subsite - The Subsite entity to add.
   * @returns The updated User entity.
   */
  addSubsite(userId: number, Subsite: Subsite): Promise<User>;

  /**
   * Removes a sub-site from a user's profile.
   * @param userId - The unique ID of the user.
   * @param SubsiteId - The unique ID of the sub-site to remove.
   * @returns The updated User entity.
   */
  removeSubsite(userId: number, SubsiteId: number): Promise<User>;

  /**
   * Logs a user activity.
   * @param userId - The unique ID of the user.
   * @param action - The activity performed by the user.
   * @param productId - Optional ID of the product related to the action.
   * @returns A promise that resolves when the logging is complete.
   */
  logActivity(
    userId: number,
    action: UserActivityAction,
    productId?: number,
  ): Promise<void>;

  /**
   * Retrieves a user's activity log.
   * @param userId - The unique ID of the user.
   * @returns An array of UserActivity entities.
   */
  getActivityLog(userId: number): Promise<UserActivity[]>;

  /**
   * Creates an audit log entry.
   * @param userId - The unique ID of the user.
   * @param auditLog - The log performed by the user.
   * @returns A promise that resolves when the log entry is created.
   */
  createAuditLog(userId: number, auditLog: AuditLog): Promise<void>;

  /**
   * Retrieves all audit logs related to a user.
   * @param userId - The unique ID of the user.
   * @returns An array of AuditLog entities.
   */
  getAuditLogs(userId: number): Promise<AuditLog[]>;

  /**
   * Finds a user by their email address.
   * @param email - The email address to search for.
   * @returns The User entity if found, otherwise null.
   */
  getByEmail(email: string): Promise<User | null>;

  /**
   * Updates a user's profile information.
   * @param userId - The unique ID of the user.
   * @param profile - The updated UserProfile entity.
   * @returns The updated User entity.
   */
  updateProfile(userId: number, profile: UserProfile): Promise<User>;

  /**
   * Updates a user's password.
   * @param userId - The unique ID of the user.
   * @param newPassword - The new password to set.
   * @returns The updated User entity.
   */
  updatePassword(userId: number, newPassword: string): Promise<User>;

  /**
   * Retrieves a user's orders.
   * @param userId - The unique ID of the user.
   * @returns An array of Order entities associated with the user.
   */
  getOrders(userId: number): Promise<Order[]>;

  /**
   * Retrieves a user's addresses.
   * @param userId - The unique ID of the user.
   * @returns An array of Address entities associated with the user.
   */
  getAddresses(userId: number): Promise<Address[]>;

  /**
   * Retrieves a user's reviews.
   * @param userId - The unique ID of the user.
   * @returns An array of Review entities associated with the user.
   */
  getReviews(userId: number): Promise<Review[]>;

  /**
   * Retrieves a user's cart.
   * @param userId - The unique ID of the user.
   * @returns The Cart entity associated with the user, or null if no cart exists.
   */
  getCart(userId: number): Promise<Cart | null>;

  /**
   * Retrieves a user's tickets.
   * @param userId - The unique ID of the user.
   * @returns An array of Ticket entities associated with the user.
   */
  getTickets(userId: number): Promise<Ticket[]>;

  /**
   * Retrieves a user's notifications.
   * @param userId - The unique ID of the user.
   * @returns An array of Notification entities associated with the user.
   */
  getNotifications(userId: number): Promise<Notification[]>;

  /**
   * Retrieves a user's sub-sites.
   * @param userId - The unique ID of the user.
   * @returns An array of Subsite entities associated with the user.
   */
  getSubsites(userId: number): Promise<Subsite[]>;

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
