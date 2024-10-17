import { Injectable, Inject } from '@nestjs/common';
import { UserProfile } from 'src/domain/entities/user-profile.entity';
import { IUserProfileRepository } from 'src/domain/repositories/user-profile.repository';
import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
import { fromUserProfileDTO } from '../helper/to-entity/to.user-profile.entity';
/**
 * Service class for managing user profiles.
 * Implements business logic and interacts with the repository layer.
 */
@Injectable()
export class UserProfileService {
  constructor(
    @Inject('IUserProfileRepository')
    private readonly userProfileRepository: IUserProfileRepository,
  ) {}

  /**
   * Creates a new user profile.
   * @param profileDTO - Data Transfer Object for creating a user profile.
   * @returns The created UserProfile entity.
   */
  async createUserProfile(profileDTO: UserProfileDTO): Promise<UserProfile> {
    // Map DTO to Entity
    const profile = fromUserProfileDTO(profileDTO);
    return this.userProfileRepository.create(profile);
  }

  /**
   * Retrieves a user profile by its ID.
   * @param id - The unique ID of the profile.
   * @returns The UserProfile entity if found, otherwise null.
   */
  async getUserProfileById(id: number): Promise<UserProfile | null> {
    return this.userProfileRepository.getById(id);
  }

  /**
   * Updates a user profile with the provided data.
   * @param id - The ID of the profile to update.
   * @param updates - Partial fields to update.
   * @returns The updated UserProfile entity.
   */
  async updateUserProfile(
    id: number,
    updates: Partial<UserProfileDTO>,
  ): Promise<UserProfile> {
    // Convert DTO updates to Entity updates
    const updatesProfile = fromUserProfileDTO(updates);
    return this.userProfileRepository.update(id, updatesProfile);
  }

  /**
   * Deletes a user profile by its ID.
   * @param id - The ID of the profile to delete.
   * @returns A boolean indicating if the deletion was successful.
   */
  async deleteUserProfile(id: number): Promise<boolean> {
    return this.userProfileRepository.remove(id);
  }

  /**
   * Retrieves a user profile by the user ID.
   * @param userId - The user ID to find the profile for.
   * @returns The UserProfile entity if found, otherwise null.
   */
  async getUserProfileByUserId(userId: number): Promise<UserProfile | null> {
    return this.userProfileRepository.getByUserId(userId);
  }

  /**
   * Updates the phone number of a user profile.
   * @param userId - The user ID whose phone number to update.
   * @param phone - The new phone number.
   * @returns The updated UserProfile entity.
   */
  async updatePhoneNumber(userId: number, phone: string): Promise<UserProfile> {
    return this.userProfileRepository.updatePhone(userId, phone);
  }

  /**
   * Updates the birthday of a user profile.
   * @param userId - The user ID whose birthday to update.
   * @param birthday - The new birthday.
   * @returns The updated UserProfile entity.
   */
  async updateBirthday(userId: number, birthday: Date): Promise<UserProfile> {
    return this.userProfileRepository.updateBirthday(userId, birthday);
  }

  /**
   * Updates the gender of a user profile.
   * @param userId - The user ID whose gender to update.
   * @param gender - The new gender.
   * @returns The updated UserProfile entity.
   */
  async updateGender(userId: number, gender: string): Promise<UserProfile> {
    return this.userProfileRepository.updateGender(userId, gender);
  }

  /**
   * Retrieves all user profiles with a specific gender.
   * @param gender - The gender to filter by.
   * @returns An array of UserProfile entities.
   */
  async getUserProfilesByGender(gender: string): Promise<UserProfile[]> {
    return this.userProfileRepository.getByGender(gender);
  }

  /**
   * Retrieves user profiles with birthdays in a given date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns An array of UserProfile entities.
   */
  async getUserProfilesByBirthdayRange(
    startDate: Date,
    endDate: Date,
  ): Promise<UserProfile[]> {
    return this.userProfileRepository.getByBirthdayRange(startDate, endDate);
  }

  /**
   * Checks if a phone number is already in use.
   * @param phone - The phone number to check.
   * @returns A boolean indicating if the phone number is already associated with another profile.
   */
  async isPhoneInUse(phone: string): Promise<boolean> {
    return this.userProfileRepository.isPhoneInUse(phone);
  }

  /**
   * Checks if a profile exists for the given user ID.
   * @param userId - The ID to check.
   * @returns A boolean indicating if a profile exists.
   */
  async profileExists(userId: number): Promise<boolean> {
    return this.userProfileRepository.exists(userId);
  }

  /**
   * Retrieves all profiles that have been recently updated.
   * @param limit - The number of recent profiles to retrieve.
   * @returns An array of the most recently updated profiles.
   */
  // async getRecentlyUpdatedProfiles(limit: number): Promise<UserProfile[]> {
  //   return this.userProfileRepository.getRecentlyUpdated(limit);
  // }

  /**
   * Finds profiles with similar data points for potential data clustering or user matching.
   * @param criteria - Criteria for matching profiles (e.g., similar
   * interests, age, etc.).
   * @returns An array of matched profiles.
   */
  async findMatchingProfiles(
    criteria: Partial<UserProfileDTO>,
  ): Promise<UserProfile[]> {
    const profileCriteria = fromUserProfileDTO(criteria);
    return this.userProfileRepository.findMatches(profileCriteria);
  }
}
