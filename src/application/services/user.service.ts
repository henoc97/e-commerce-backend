import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/domain/entities/address.entity';
import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { Cart } from 'src/domain/entities/cart.entity';
import { Order } from 'src/domain/entities/order.entity';
import { Review } from 'src/domain/entities/review.entity';
import { Subsite } from 'src/domain/entities/Subsite.entity';
import { Ticket } from 'src/domain/entities/ticket.entity';
import { UserActivity } from 'src/domain/entities/user-activity.entity';
import { Notification } from 'src/domain/entities/notification.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserActivityAction } from 'src/domain/enums/user-activity-action.enum';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserDTO } from 'src/presentation/dtos/user.dto';
import { fromUserDTO } from '../helper/to-entity/to.user.entity';
import { fromNotificationDTO } from '../helper/to-entity/to.notification.entity';
import { NotificationDTO } from 'src/presentation/dtos/notification.dto';
import { SubsiteDTO } from 'src/presentation/dtos/Subsite.dto';
import { fromSubsiteDTO } from '../helper/to-entity/to.sub-site.entity';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';
import { fromAuditLogDTO } from '../helper/to-entity/to.audit-log.entity';
import { fromUserProfileDTO } from '../helper/to-entity/to.user-profile.entity';
import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
import { AddressDTO } from 'src/presentation/dtos/address.dto';
import { fromAddressDTO } from '../helper/to-entity/to.address.entity';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { fromOrderDTO } from '../helper/to-entity/to.order.entity';
import { IAddressRepository } from 'src/domain/repositories/address.repository';
import { IOrderRepository } from 'src/domain/repositories/order.repository';
import { IUserActivityRepository } from 'src/domain/repositories/user-activity.repository';
import { IUserProfileRepository } from 'src/domain/repositories/user-profile.repository';
import { ITicketRepository } from 'src/domain/repositories/ticket.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') 
    private readonly userRepository: IUserRepository,
    private readonly addressService: IAddressRepository,
    private readonly orderService: IOrderRepository,
    private readonly userActivityService: IUserActivityRepository,
    private readonly userProfileService: IUserProfileRepository,
    private readonly ticketService: ITicketRepository,
  ) {}

  /**
   * Create a new user.
   * @param userDTO - UserDTO entity containing user data.
   * @returns The created User entity.
   */
  async createUser(userDTO: UserDTO): Promise<User> {
    const user = fromUserDTO(userDTO);
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
    const updatedUser = fromUserDTO(updates);
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
  async addAddressToUser(userId: number, address: AddressDTO): Promise<User> {
    const ad = fromAddressDTO(address);
    await this.addressService.create(ad)
    return await this.userRepository.getById(userId);
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
    await this.addressService.deleteById(addressId)
    return await this.userRepository.getById(userId);
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
    notification: NotificationDTO,
  ): Promise<User> {
    const notif = fromNotificationDTO(notification);
    return await this.userRepository.addNotification(userId, notif);
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
   * Add a Subsite to the user's profile.
   * @param userId - The unique ID of the user.
   * @param subsite - subsite entity to be added.
   * @returns The updated User entity.
   */
  async addSubsiteToUser(userId: number, subsite: SubsiteDTO): Promise<User> {
    const site = fromSubsiteDTO(subsite);
    return await this.userRepository.addSubsite(userId, site);
  }

  /**
   * Remove a Subsite from the user's profile.
   * @param userId - The unique ID of the user.
   * @param SubsiteId - The unique ID of the Subsite to be removed.
   * @returns The updated User entity.
   */
  async removeSubsiteFromUser(
    userId: number,
    subsiteId: number,
  ): Promise<User> {
    return await this.userRepository.removeSubsite(userId, subsiteId);
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
   * @param auditLog - The log performed by the user.
   */
  async createAuditLog(userId: number, auditLog: AuditLogDTO): Promise<void> {
    const log = fromAuditLogDTO(auditLog);
    await this.userRepository.createAuditLog(userId, log);
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
  async updateUserProfile(
    userId: number,
    profile: UserProfileDTO,
  ): Promise<User> {
    const pf = fromUserProfileDTO(profile);
    return await this.userRepository.updateProfile(userId, pf);
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
   * @returns An array of Subsite entities associated with the user.
   */
  async getSubsites(userId: number): Promise<Subsite[]> {
    return await this.userRepository.getSubsites(userId);
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
