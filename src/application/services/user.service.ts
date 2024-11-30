import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserDTO } from 'src/presentation/dtos/user.dto';
import { fromUserDTO } from '../helper/to-entity/to.user.entity';
import { AddressDTO } from 'src/presentation/dtos/address.dto';
import { ClientKafka } from '@nestjs/microservices';
import { AddressService } from './address.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    private readonly addressService: AddressService,
  ) { }

  /**
   * Create a new user.
   * @param userDTO - UserDTO entity containing user data.
   * @returns The created User entity.
   */
  async createUser(userDTO: UserDTO): Promise<User> {
    const user = fromUserDTO(userDTO);
    const result = await this.userRepository.create(user);

    if (result) {
      // Ne sérialiser que les données essentielles
      const kafkaPayload = {
        id: result.id,
        email: result.email,
        name: result.name,
        role: result.role,
        createdAt: result.createdAt
      };

      try {
        this.kafkaService.emit('user.created', JSON.stringify(kafkaPayload));
        console.log('Message Kafka émis avec succès:', kafkaPayload);
      } catch (error) {
        console.error('Erreur lors de l\'émission du message Kafka:', error);
      }
    }

    return result;
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
    const result = await this.userRepository.update(id, updatedUser);
    if (result) this.kafkaService.emit('user.update', JSON.stringify(result));
    return result;
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
    await this.addressService.createAddress(address);
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
    await this.addressService.deleteAddressById(addressId);
    return await this.userRepository.getById(userId);
  }

  // /**
  //  * Remove an order from the user's profile.
  //  * @param userId - The unique ID of the user.
  //  * @param orderId - The unique ID of the order to be removed.
  //  * @returns The updated User entity.
  //  */
  // async removeOrderFromUser(userId: number, orderId: number): Promise<User> {
  //   return await this.userRepository.removeOrder(userId, orderId);
  // }

  // /**
  //  * Add a notification to the user's profile.
  //  * @param userId - The unique ID of the user.
  //  * @param notification - Notification entity to be added.
  //  * @returns The updated User entity.
  //  */
  // async addNotificationToUser(
  //   userId: number,
  //   notification: NotificationDTO,
  // ): Promise<User> {
  //   const notif = fromNotificationDTO(notification);
  //   return await this.userRepository.addNotification(userId, notif);
  // }

  // /**
  //  * Remove a notification from the user's profile.
  //  * @param userId - The unique ID of the user.
  //  * @param notificationId - The unique ID of the notification to be removed.
  //  * @returns The updated User entity.
  //  */
  // async removeNotificationFromUser(
  //   userId: number,
  //   notificationId: number,
  // ): Promise<User> {
  //   return await this.userRepository.removeNotification(userId, notificationId);
  // }

  // /**
  //  * Add a Subsite to the user's profile.
  //  * @param userId - The unique ID of the user.
  //  * @param subsite - subsite entity to be added.
  //  * @returns The updated User entity.
  //  */
  // async addSubsiteToUser(userId: number, subsite: SubsiteDTO): Promise<User> {
  //   const site = fromSubsiteDTO(subsite);
  //   return await this.userRepository.addSubsite(userId, site);
  // }

  // /**
  //  * Remove a Subsite from the user's profile.
  //  * @param userId - The unique ID of the user.
  //  * @param SubsiteId - The unique ID of the Subsite to be removed.
  //  * @returns The updated User entity.
  //  */
  // async removeSubsiteFromUser(
  //   userId: number,
  //   subsiteId: number,
  // ): Promise<User> {
  //   return await this.userRepository.removeSubsite(userId, subsiteId);
  // }

  // /**
  //  * Log an activity for the user.
  //  * @param userId - The unique ID of the user.
  //  * @param action - The action performed by the user.
  //  * @param productId - Optional ID of the product related to the action.
  //  */
  // async logUserActivity(
  //   userId: number,
  //   action: UserActivityAction,
  //   productId?: number,
  // ): Promise<void> {
  //   await this.userRepository.logActivity(userId, action, productId);
  // }

  // /**
  //  * Retrieve the activity log of a user.
  //  * @param userId - The unique ID of the user.
  //  * @returns An array of UserActivity entities.
  //  */
  // async getUserActivityLog(userId: number): Promise<UserActivity[]> {
  //   return await this.userRepository.getActivityLog(userId);
  // }

  // /**
  //  * Create an audit log entry for the user.
  //  * @param userId - The unique ID of the user.
  //  * @param auditLog - The log performed by the user.
  //  */
  // async createAuditLog(userId: number, auditLog: AuditLogDTO): Promise<void> {
  //   const log = fromAuditLogDTO(auditLog);
  //   await this.userRepository.createAuditLog(userId, log);
  // }

  // /**
  //  * Retrieve all audit logs related to the user.
  //  * @param userId - The unique ID of the user.
  //  * @returns An array of AuditLog entities.
  //  */
  // async getUserAuditLogs(userId: number): Promise<AuditLog[]> {
  //   return await this.userRepository.getAuditLogs(userId);
  // }

  /**
   * Retrieve a user by their email address.
   * @param email - The email address to search for.
   * @returns The User entity if found, otherwise null.
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getByEmail(email);
  }

  // /**
  //  * Update the user's profile.
  //  * @param userId - The unique ID of the user.
  //  * @param profile - Updated UserProfile entity.
  //  * @returns The updated User entity.
  //  */
  // async updateUserProfile(
  //   userId: number,
  //   profile: UserProfileDTO,
  // ): Promise<User> {
  //   const pf = fromUserProfileDTO(profile);
  //   return await this.userRepository.updateProfile(userId, pf);
  // }

  /**
   * Update the user's password.
   * @param userId - The unique ID of the user.
   * @param newPassword - The new password to set.
   * @returns The updated User entity.
   */
  async updateUserPassword(userId: number, newPassword: string): Promise<User> {
    return await this.userRepository.updatePassword(userId, newPassword);
  }

  // /**
  //  * Retrieve all orders associated with the user.
  //  * @param userId - The unique ID of the user.
  //  * @returns An array of Order entities.
  //  */
  // async getUserOrders(userId: number): Promise<Order[]> {
  //   return await this.userRepository.getOrders(userId);
  // }

  // /**
  //  * Retrieve all addresses associated with the user.
  //  * @param userId - The unique ID of the user.
  //  * @returns An array of Address entities.
  //  */
  // async getUserAddresses(userId: number): Promise<Address[]> {
  //   return await this.userRepository.getAddresses(userId);
  // }

  // /**
  //  * Retrieves a user's reviews.
  //  * @param userId - The unique ID of the user.
  //  * @returns An array of Review entities associated with the user.
  //  */
  // async getReviews(userId: number): Promise<Review[]> {
  //   return await this.userRepository.getReviews(userId);
  // }

  // /**
  //  * Retrieves a user's cart.
  //  * @param userId - The unique ID of the user.
  //  * @returns The Cart entity associated with the user, or null if no cart exists.
  //  */
  // async getCart(userId: number): Promise<Cart | null> {
  //   return await this.userRepository.getCart(userId);
  // }

  // /**
  //  * Retrieves a user's tickets.
  //  * @param userId - The unique ID of the user.
  //  * @returns An array of Ticket entities associated with the user.
  //  */
  // async getTickets(userId: number): Promise<Ticket[]> {
  //   return await this.userRepository.getTickets(userId);
  // }

  // /**
  //  * Retrieves a user's notifications.
  //  * @param userId - The unique ID of the user.
  //  * @returns An array of Notification entities associated with the user.
  //  */
  // async getNotifications(userId: number): Promise<Notification[]> {
  //   return await this.userRepository.getNotifications(userId);
  // }

  // /**
  //  * Retrieves a user's sub-sites.
  //  * @param userId - The unique ID of the user.
  //  * @returns An array of Subsite entities associated with the user.
  //  */
  // async getSubsites(userId: number): Promise<Subsite[]> {
  //   return await this.userRepository.getSubsites(userId);
  // }

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
