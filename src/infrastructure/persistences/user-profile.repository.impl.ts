import { fromUserProfilePrisma } from 'src/application/helper/from-prisma/to.user-profile.entity';
import { UserProfile } from 'src/domain/entities/user-profile.entity';
import { IUserProfileRepository } from 'src/domain/repositories/user-profile.repository';
import prisma from 'prisma/prisma.service';

/**
 * Repository implementation for user profiles.
 * Provides methods to create, retrieve, update, and delete user profiles.
 */
export class UserProfileRepository implements IUserProfileRepository {


  /**
   * Creates a new user profile.
   * @param profile - The user profile to create.
   * @returns A promise that resolves to the created UserProfile.
   */
  async create(profile: UserProfile): Promise<UserProfile> {
    try {
      const { user, ...data } = profile;
      const result = await prisma.userProfile.create({
        data: data,
      });
      return fromUserProfilePrisma(result);
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Could not create user profile.');
    }
  }

  /**
   * Retrieves a user profile by its ID.
   * @param id - The unique identifier of the user profile.
   * @returns A promise that resolves to the UserProfile or null if not found.
   */
  async getById(id: number): Promise<UserProfile | null> {
    try {
      const result = await prisma.userProfile.findUnique({
        where: { id },
      });
      return fromUserProfilePrisma(result);
    } catch (error) {
      console.error('Error retrieving user profile by ID:', error);
      throw new Error('Could not retrieve user profile.');
    }
  }

  /**
   * Updates a user profile by ID.
   * @param id - The unique identifier of the user profile.
   * @param updates - An object containing the properties to update.
   * @returns A promise that resolves to the updated UserProfile.
   */
  async update(
    id: number,
    updates: Partial<UserProfile>,
  ): Promise<UserProfile> {
    try {
      const { user, ...data } = updates;
      const result = await prisma.userProfile.update({
        where: { id },
        data: data,
      });
      return fromUserProfilePrisma(result);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Could not update user profile.');
    }
  }

  /**
   * Removes a user profile by ID.
   * @param id - The unique identifier of the user profile.
   * @returns A promise that resolves to true if the profile was removed, false otherwise.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await prisma.userProfile.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error removing user profile:', error);
      throw new Error('Could not remove user profile.');
    }
  }

  /**
   * Retrieves a user profile by user ID.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to the UserProfile or null if not found.
   */
  async getByUserId(userId: number): Promise<UserProfile | null> {
    try {
      const result = await prisma.userProfile.findUnique({
        where: { userId },
      });
      return fromUserProfilePrisma(result);
    } catch (error) {
      console.error('Error retrieving user profile by user ID:', error);
      throw new Error('Could not retrieve user profile.');
    }
  }

  /**
   * Updates the phone number of a user profile.
   * @param userId - The unique identifier of the user.
   * @param phone - The new phone number to set.
   * @returns A promise that resolves to the updated UserProfile.
   */
  async updatePhone(userId: number, phone: string): Promise<UserProfile> {
    return this.updateUserField(userId, { phone });
  }

  /**
   * Updates the birthday of a user profile.
   * @param userId - The unique identifier of the user.
   * @param birthday - The new birthday to set.
   * @returns A promise that resolves to the updated UserProfile.
   */
  async updateBirthday(userId: number, birthday: Date): Promise<UserProfile> {
    return this.updateUserField(userId, { birthday });
  }

  /**
   * Updates the gender of a user profile.
   * @param userId - The unique identifier of the user.
   * @param gender - The new gender to set.
   * @returns A promise that resolves to the updated UserProfile.
   */
  async updateGender(userId: number, gender: string): Promise<UserProfile> {
    return this.updateUserField(userId, { gender });
  }

  private async updateUserField(
    userId: number,
    updates: Partial<UserProfile>,
  ): Promise<UserProfile> {
    try {
      const { user, ...data } = updates;
      const result = await prisma.userProfile.update({
        where: { userId },
        data: data,
      });
      return fromUserProfilePrisma(result);
    } catch (error) {
      console.error('Error updating user profile field:', error);
      throw new Error('Could not update user profile field.');
    }
  }

  /**
   * Retrieves user profiles by gender.
   * @param gender - The gender to filter profiles by.
   * @returns A promise that resolves to an array of UserProfiles matching the specified gender.
   */
  async getByGender(gender: string): Promise<UserProfile[]> {
    try {
      const result = await prisma.userProfile.findMany({
        where: { gender },
      });
      return result.map(fromUserProfilePrisma);
    } catch (error) {
      console.error('Error retrieving user profiles by gender:', error);
      throw new Error('Could not retrieve user profiles by gender.');
    }
  }

  /**
   * Retrieves user profiles by a date range for birthdays.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of UserProfiles within the specified date range.
   */
  async getByBirthdayRange(
    startDate: Date,
    endDate: Date,
  ): Promise<UserProfile[]> {
    try {
      const result = await prisma.userProfile.findMany({
        where: {
          birthday: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return result.map(fromUserProfilePrisma);
    } catch (error) {
      console.error('Error retrieving user profiles by birthday range:', error);
      throw new Error('Could not retrieve user profiles by birthday range.');
    }
  }

  /**
   * Checks if a phone number is already in use.
   * @param phone - The phone number to check.
   * @returns A promise that resolves to true if the phone is in use, false otherwise.
   */
  async isPhoneInUse(phone: string): Promise<boolean> {
    try {
      const count = await prisma.userProfile.count({
        where: { phone },
      });
      return count > 0;
    } catch (error) {
      console.error('Error checking if phone is in use:', error);
      throw new Error('Could not check phone usage.');
    }
  }

  /**
   * Checks if a user profile exists for a given user ID.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to true if the profile exists, false otherwise.
   */
  async exists(userId: number): Promise<boolean> {
    try {
      const count = await prisma.userProfile.count({
        where: { userId },
      });
      return count > 0;
    } catch (error) {
      console.error('Error checking if user profile exists:', error);
      throw new Error('Could not check user profile existence.');
    }
  }

  /**
   * Finds user profiles that match the given criteria.
   * @param criteria - An object containing the properties to match.
   * @returns A promise that resolves to an array of UserProfiles that match the criteria.
   */
  async findMatches(criteria: Partial<UserProfile>): Promise<UserProfile[]> {
    try {
      const { user, ...data } = criteria;
      const result = await prisma.userProfile.findMany({
        where: data,
      });
      return result.map(fromUserProfilePrisma);
    } catch (error) {
      console.error('Error finding matching user profiles:', error);
      throw new Error('Could not find matching user profiles.');
    }
  }
}
