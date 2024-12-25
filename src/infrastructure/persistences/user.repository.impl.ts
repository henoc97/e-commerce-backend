import prisma from '../../../prisma/prisma.service';
import { fromUserPrisma } from '../../application/helper/from-prisma/to.user.entity';
import { User } from '../../domain/entities/user.entity';
import { UserActivityAction } from '../../domain/enums/user-activity-action.enum';
import { UserRole } from '../../domain/enums/user-role.enum';
import { IUserRepository } from '../../domain/repositories/user.repository';

export class UserRepository implements IUserRepository {
  constructor(
    // private readonly prisma: PrismaService
  ) {
  }

  /**
   * Create a new user in the database.
   * @param user - The user object containing user details.
   * @returns Promise<User> - The created user object.
   */
  async create(user: User): Promise<User> {
    console.log('Input user object:', user);

    try {
      // Vérifie si Prisma est initialisé
      if (!prisma) {
        throw new Error('Prisma client is not initialized');
      }
      // Vérifie si Prisma est initialisé
      if (!prisma.user) {
        throw new Error('User model is undefined.');
      }

      // Extraction des champs scalaires uniquement
      const { email, password, name, role } = user;

      const result = await prisma.user.create({
        data: { email, password, name, role },
      });

      console.log('Created user:', result);
      return fromUserPrisma(result);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed.');
    }
  }


  /**
   * Get a user by their ID.
   * @param id - The unique identifier of the user.
   * @returns Promise<User | null> - The user object or null if not found.
   */
  async getById(id: number): Promise<User | null> {
    try {
      const result = await prisma.user.findUnique({ where: { id } });
      return fromUserPrisma(result);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Failed to fetch user.');
    }
  }

  /**
   * Update user details.
   * @param id - The unique identifier of the user.
   * @param updates - The updates to apply to the user.
   * @returns Promise<User> - The updated user object.
   */
  async update(id: number, updates: Partial<User>): Promise<User> {
    try {
      const {
        profile,
        addresses,
        orders,
        vendor,
        carts,
        ...data
      } = updates;
      const result = await prisma.user.update({
        where: { id },
        data: data,
      });
      return fromUserPrisma(result);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('User update failed.');
    }
  }

  /**
   * Delete a user from the database.
   * @param id - The unique identifier of the user to delete.
   * @returns Promise<boolean> - True if deletion was successful, otherwise false.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  /**
   * Get users by their role.
   * @param role - The role of the users to retrieve.
   * @returns Promise<User[]> - List of users with the specified role.
   */
  async getByRole(role: UserRole): Promise<User[]> {
    try {
      const result = await prisma.user.findMany({ where: { role } });
      return result?.map(fromUserPrisma);
    } catch (error) {
      console.error('Error fetching users by role:', error);
      throw new Error('Failed to fetch users by role.');
    }
  }

  /**
   * Remove an address from a user.
   * @param userId - The ID of the user from whom the address is removed.
   * @param addressId - The ID of the address to remove.
   * @returns Promise<User> - The updated user object.
   */
  async removeAddress(userId: number, addressId: number): Promise<User> {
    try {
      const result = await prisma.user.update({
        where: { id: userId },
        data: { addresses: { delete: { id: addressId } } },
      });
      return fromUserPrisma(result);
    } catch (error) {
      console.error('Error removing address:', error);
      throw new Error('Failed to remove address.');
    }
  }

  /**
   * Remove an order from a user.
   * @param userId - The ID of the user from whom the order is removed.
   * @param orderId - The ID of the order to remove.
   * @returns Promise<User> - The updated user object.
   */
  async removeOrder(userId: number, orderId: number): Promise<User> {
    try {
      const result = await prisma.user.update({
        where: { id: userId },
        data: { orders: { delete: { id: orderId } } },
      });
      return fromUserPrisma(result);
    } catch (error) {
      console.error('Error removing order:', error);
      throw new Error('Failed to remove order.');
    }
  }

  /**
   * Get a user by their email.
   * @param email - The email of the user to retrieve.
   * @returns Promise<User | null> - The user object if found, otherwise null.
   */
  async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          profile: true,
          addresses: true,
          orders: true,
          vendor: true,
          cart: true
        }
      });

      return fromUserPrisma(user);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Failed to fetch user by email.');
    }
  }

  /**
   * Update a user's password.
   * @param userId - The ID of the user whose password is updated.
   * @param newPassword - The new password to set.
   * @returns Promise<User> - The updated user object.
   */
  async updatePassword(userId: number, newPassword: string): Promise<User> {
    try {
      const result = await prisma.user.update({
        where: { id: userId },
        data: { password: newPassword },
      });
      return fromUserPrisma(result);
    } catch (error) {
      console.error('Error updating user password:', error);
      throw new Error('Failed to update user password.');
    }
  }

  /**
   * Get the count of users by their role.
   * @param role - The role to filter users.
   * @returns Promise<number> - The count of users with the specified role.
   */
  async getCountByRole(role: UserRole): Promise<number> {
    try {
      const result = await prisma.user.count({ where: { role } });
      return result;
    } catch (error) {
      console.error('Error fetching user count by role:', error);
      throw new Error('Failed to fetch user count by role.');
    }
  }

  /**
   * Get a list of inactive users who have not logged in for a specified number of days.
   * @param days - The number of days to consider for inactivity.
   * @returns Promise<User[]> - List of inactive users.
   */
  async getInactiveUsers(days: number): Promise<User[]> {
    try {
      // Calculate the date threshold for considering inactivity.
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - days);

      const inactiveUsers = await prisma.user.findMany({
        where: {
          userActivity: {
            every: {
              action: UserActivityAction.LOGIN,
              createdAt: {
                lt: dateThreshold,
              },
            },
          },
        },
      });

      return inactiveUsers?.map(fromUserPrisma);
    } catch (error) {
      console.error('Error fetching inactive users:', error);
      throw new Error('Failed to fetch inactive users.');
    }
  }

  /**
   * Update the role of a user.
   * @param userId - The ID of the user whose role is updated.
   * @param role - The new role to set for the user.
   * @returns Promise<User> - The updated user object.
   */
  async updateRole(userId: number, role: UserRole): Promise<User> {
    try {
      const result = await prisma.user.update({
        where: { id: userId },
        data: { role },
      });
      return fromUserPrisma(result);
    } catch (error) {
      console.error('Error updating user role:', error);
      throw new Error('Failed to update user role.');
    }
  }

  /**
   * Get the count of active users who have logged in within the last specified number of days.
   * @param days - The number of days to consider for activity (e.g., 30 days).
   * @returns Promise<number> - The count of active users.
   */
  async getActiveCount(days: number = 30): Promise<number> {
    try {
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - days);

      const activeUserCount = await prisma.user.count({
        where: {
          userActivity: {
            some: {
              action: UserActivityAction.LOGIN,
              createdAt: {
                gte: dateThreshold,
              },
            },
          },
        },
      });

      return activeUserCount;
    } catch (error) {
      console.error('Error fetching active user count:', error);
      throw new Error('Failed to fetch active user count.');
    }
  }

  /**
   * Delete a user by their ID.
   * @param userId - The ID of the user to delete.
   * @returns Promise<void>
   */
  async deleteUser(userId: number): Promise<boolean> {
    try {
      await prisma.user.delete({ where: { id: userId } });
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user.');
    }
  }
}
