import { UserProfile } from '../entities/user-profile.entity';

/**
 * Interface for managing user profile operations, including CRUD and business logic.
 */
export interface IUserProfileRepository {
  /**
   * Creates a new user profile.
   * @param profile - The user profile entity to be created.
   * @returns The created UserProfile entity.
   */
  create(profile: UserProfile): Promise<UserProfile>;

  /**
   * Retrieves a user profile by its ID.
   * @param id - The unique ID of the profile.
   * @returns The UserProfile entity if found, otherwise null.
   */
  getById(id: number): Promise<UserProfile | null>;

  /**
   * Updates a user profile with the provided data.
   * @param id - The ID of the profile to update.
   * @param updates - Partial fields to update.
   * @returns The updated UserProfile entity.
   */
  update(id: number, updates: Partial<UserProfile>): Promise<UserProfile>;

  /**
   * Deletes a user profile by its ID.
   * @param id - The ID of the profile to delete.
   * @returns A boolean indicating if the deletion was successful.
   */
  remove(id: number): Promise<boolean>;

  /**
   * Retrieves a user profile by the user ID.
   * @param userId - The user ID to find the profile for.
   * @returns The UserProfile entity if found, otherwise null.
   */
  getByUserId(userId: number): Promise<UserProfile | null>;

  /**
   * Updates the phone number of a user profile.
   * @param userId - The user ID whose phone number to update.
   * @param phone - The new phone number.
   * @returns The updated UserProfile entity.
   */
  updatePhone(userId: number, phone: string): Promise<UserProfile>;

  /**
   * Updates the birthday of a user profile.
   * @param userId - The user ID whose birthday to update.
   * @param birthday - The new birthday.
   * @returns The updated UserProfile entity.
   */
  updateBirthday(userId: number, birthday: Date): Promise<UserProfile>;

  /**
   * Updates the gender of a user profile.
   * @param userId - The user ID whose gender to update.
   * @param gender - The new gender.
   * @returns The updated UserProfile entity.
   */
  updateGender(userId: number, gender: string): Promise<UserProfile>;

  /**
   * Retrieves all user profiles with a specific gender.
   * @param gender - The gender to filter by.
   * @returns An array of UserProfile entities.
   */
  getByGender(gender: string): Promise<UserProfile[]>;

  /**
   * Retrieves user profiles with birthdays in a given date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns An array of UserProfile entities.
   */
  getByBirthdayRange(startDate: Date, endDate: Date): Promise<UserProfile[]>;

  /**
   * Checks if a phone number is already in use.
   * @param phone - The phone number to check.
   * @returns A boolean indicating if the phone number is already associated with another profile.
   */
  isPhoneInUse(phone: string): Promise<boolean>;

  /**
   * Checks if a profile exists for the given user ID.
   * @param userId - The ID to check.
   * @returns A boolean indicating if a profile exists.
   */
  exists(userId: number): Promise<boolean>;

  /**
   * Retrieves all profiles that have been recently updated.
   * @param limit - The number of recent profiles to retrieve.
   * @returns An array of the most recently updated profiles.
   */
  getRecentlyUpdated(limit: number): Promise<UserProfile[]>;

  /**
   * Finds profiles with similar data points for potential data clustering or user matching.
   * @param criteria - Criteria for matching profiles (e.g., similar interests, age, etc.).
   * @returns An array of matched profiles.
   */
  findMatches(criteria: Partial<UserProfile>): Promise<UserProfile[]>;
}
