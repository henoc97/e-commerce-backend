import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/domain/entities/address.entity';
import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { Cart } from 'src/domain/entities/cart.entity';
import { Order } from 'src/domain/entities/order.entity';
import { Review } from 'src/domain/entities/review.entity';
import { SubSite } from 'src/domain/entities/subsite.entity';
import { Ticket } from 'src/domain/entities/ticket.entity';
import { UserActivity } from 'src/domain/entities/user-activity.entity';
import { UserProfile } from 'src/domain/entities/user-profile.entity';
import { User } from 'src/domain/entities/user.entity';
import { AuditLogAction } from 'src/domain/enums/audit-log-action.enum';
import { UserActivityAction } from 'src/domain/enums/user-activity-action.enum';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserDTO } from 'src/presentation/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Create a new user.
   * @param userDTO - UserDTO entity containing user data.
   * @returns The created User entity.
   */
  async createUser(userDTO: UserDTO): Promise<User> {
    const user = new User(
      userDTO.id,
      userDTO.password,
      userDTO.name,
      userDTO.role,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );
    return await this.userRepository.create(user);
  }

  /**
   * Retrieve a user by their unique ID.
   * @param id - The unique identifier of the user.
   * @returns The User entity if found, otherwise null.
   */
  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.getById(id);
  }

  /**
   * Update user data.
   * @param id - The unique identifier of the user.
   * @param updates - Partial data to update the user.
   * @returns The updated User entity.
   */
  async updateUser(id: number, updates: Partial<UserDTO>): Promise<User> {
    const updatedUser = new User(
      updates.id,
      updates.password,
      updates.name,
      updates.role,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );
    return await this.userRepository.update(id, updatedUser);
  }

  /**
   * Delete a user by their unique ID.
   * @param id - The unique identifier of the user.
   * @returns True if deletion was successful, otherwise false.
   */
  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }

  /**
   * Retrieve users by their role.
   * @param role - The role to filter users by.
   * @returns An array of User entities matching the role.
   */
  async getUsersByRole(role: UserRole): Promise<User[]> {
    return await this.userRepository.getByRole(role);
  }

  /**
   * Add an address to the user's profile.
   * @param userId - The unique ID of the user.
   * @param address - Address entity to be added.
   * @returns The updated User entity.
   */
  async addAddressToUser(userId: number, address: Address): Promise<User> {
    return await this.userRepository.addAddress(userId, address);
  }

  /**
   * Remove an address from the user's profile.
   * @param userId - The unique ID of the user.
   * @param addressId - The unique ID of the address to be removed.
   * @returns The updated User entity.
   */
  async removeAddressFromUser(
    userId: number,
    addressId: number,
  ): Promise<User> {
    return await this.userRepository.removeAddress(userId, addressId);
  }

  /**
   * Add an order to the user's profile.
   * @param userId - The unique ID of the user.
   * @param order - Order entity to be added.
   * @returns The updated User entity.
   */
  async addOrderToUser(userId: number, order: Order): Promise<User> {
    return await this.userRepository.addOrder(userId, order);
  }

  /**
   * Remove an order from the user's profile.
   * @param userId - The unique ID of the user.
   * @param orderId - The unique ID of the order to be removed.
   * @returns The updated User entity.
   */
  async removeOrderFromUser(userId: number, orderId: number): Promise<User> {
    return await this.userRepository.removeOrder(userId, orderId);
  }

  /**
   * Add a notification to the user's profile.
   * @param userId - The unique ID of the user.
   * @param notification - Notification entity to be added.
   * @returns The updated User entity.
   */
  async addNotificationToUser(
    userId: number,
    notification: Notification,
  ): Promise<User> {
    return await this.userRepository.addNotification(userId, notification);
  }

  /**
   * Remove a notification from the user's profile.
   * @param userId - The unique ID of the user.
   * @param notificationId - The unique ID of the notification to be removed.
   * @returns The updated User entity.
   */
  async removeNotificationFromUser(
    userId: number,
    notificationId: number,
  ): Promise<User> {
    return await this.userRepository.removeNotification(userId, notificationId);
  }

  /**
   * Add a subsite to the user's profile.
   * @param userId - The unique ID of the user.
   * @param subSite - SubSite entity to be added.
   * @returns The updated User entity.
   */
  async addSubSiteToUser(userId: number, subSite: SubSite): Promise<User> {
    return await this.userRepository.addSubSite(userId, subSite);
  }

  /**
   * Remove a subsite from the user's profile.
   * @param userId - The unique ID of the user.
   * @param subSiteId - The unique ID of the subsite to be removed.
   * @returns The updated User entity.
   */
  async removeSubSiteFromUser(
    userId: number,
    subSiteId: number,
  ): Promise<User> {
    return await this.userRepository.removeSubSite(userId, subSiteId);
  }

  /**
   * Log an activity for the user.
   * @param userId - The unique ID of the user.
   * @param action - The action performed by the user.
   * @param productId - Optional ID of the product related to the action.
   */
  async logUserActivity(
    userId: number,
    action: UserActivityAction,
    productId?: number,
  ): Promise<void> {
    await this.userRepository.logActivity(userId, action, productId);
  }

  /**
   * Retrieve the activity log of a user.
   * @param userId - The unique ID of the user.
   * @returns An array of UserActivity entities.
   */
  async getUserActivityLog(userId: number): Promise<UserActivity[]> {
    return await this.userRepository.getActivityLog(userId);
  }

  /**
   * Create an audit log entry for the user.
   * @param userId - The unique ID of the user.
   * @param action - The action performed by the user.
   * @param entity - The entity affected.
   * @param entityId - The ID of the affected entity.
   * @param changes - The changes made to the entity.
   */
  async createAuditLog(
    userId: number,
    action: AuditLogAction,
    entity: string,
    entityId: number,
    changes: any,
  ): Promise<void> {
    await this.userRepository.createAuditLog(
      userId,
      action,
      entity,
      entityId,
      changes,
    );
  }

  /**
   * Retrieve all audit logs related to the user.
   * @param userId - The unique ID of the user.
   * @returns An array of AuditLog entities.
   */
  async getUserAuditLogs(userId: number): Promise<AuditLog[]> {
    return await this.userRepository.getAuditLogs(userId);
  }

  /**
   * Retrieve a user by their email address.
   * @param email - The email address to search for.
   * @returns The User entity if found, otherwise null.
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getByEmail(email);
  }

  /**
   * Update the user's profile.
   * @param userId - The unique ID of the user.
   * @param profile - Updated UserProfile entity.
   * @returns The updated User entity.
   */
  async updateUserProfile(userId: number, profile: UserProfile): Promise<User> {
    return await this.userRepository.updateProfile(userId, profile);
  }

  /**
   * Update the user's password.
   * @param userId - The unique ID of the user.
   * @param newPassword - The new password to set.
   * @returns The updated User entity.
   */
  async updateUserPassword(userId: number, newPassword: string): Promise<User> {
    return await this.userRepository.updatePassword(userId, newPassword);
  }

  /**
   * Retrieve all orders associated with the user.
   * @param userId - The unique ID of the user.
   * @returns An array of Order entities.
   */
  async getUserOrders(userId: number): Promise<Order[]> {
    return await this.userRepository.getOrders(userId);
  }

  /**
   * Retrieve all addresses associated with the user.
   * @param userId - The unique ID of the user.
   * @returns An array of Address entities.
   */
  async getUserAddresses(userId: number): Promise<Address[]> {
    return await this.userRepository.getAddresses(userId);
  }

  /**
   * Retrieves a user's reviews.
   * @param userId - The unique ID of the user.
   * @returns An array of Review entities associated with the user.
   */
  async getReviews(userId: number): Promise<Review[]> {
    return await this.userRepository.getReviews(userId);
  }

  /**
   * Retrieves a user's cart.
   * @param userId - The unique ID of the user.
   * @returns The Cart entity associated with the user, or null if no cart exists.
   */
  async getCart(userId: number): Promise<Cart | null> {
    return await this.userRepository.getCart(userId);
  }

  /**
   * Retrieves a user's tickets.
   * @param userId - The unique ID of the user.
   * @returns An array of Ticket entities associated with the user.
   */
  async getTickets(userId: number): Promise<Ticket[]> {
    return await this.userRepository.getTickets(userId);
  }

  /**
   * Retrieves a user's notifications.
   * @param userId - The unique ID of the user.
   * @returns An array of Notification entities associated with the user.
   */
  async getNotifications(userId: number): Promise<Notification[]> {
    return await this.userRepository.getNotifications(userId);
  }

  /**
   * Retrieves a user's sub-sites.
   * @param userId - The unique ID of the user.
   * @returns An array of SubSite entities associated with the user.
   */
  async getSubSites(userId: number): Promise<SubSite[]> {
    return await this.userRepository.getSubSites(userId);
  }

  /**
   * Retrieves the count of active users.
   * @returns The number of active users.
   */
  async getActiveCount(): Promise<number> {
    return await this.userRepository.getActiveCount();
  }

  /**
   * Retrieves the count of users by role.
   * @param role - The role to filter users by.
   * @returns The number of users with the specified role.
   */
  async getCountByRole(role: UserRole): Promise<number> {
    return await this.userRepository.getCountByRole(role);
  }

  /**
   * Finds users who have been inactive for a specified number of days.
   * @param days - The number of days of inactivity.
   * @returns An array of User entities who have been inactive for the specified number of days.
   */
  async getInactiveUsers(days: number): Promise<User[]> {
    return await this.userRepository.getInactiveUsers(days);
  }
}
