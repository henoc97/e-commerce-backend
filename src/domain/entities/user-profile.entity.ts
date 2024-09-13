import { User } from './user.entity';

/**
 * Represents a user's profile.
 */
export class UserProfile {
  /**
   * Unique identifier for the user profile.
   */
  id: number;

  /**
   * Identifier of the user to whom this profile belongs.
   */
  userId: number;

  /**
   * User object representing the relationship between the profile and the user.
   */
  user: User;

  /**
   * Phone number of the user (optional).
   */
  phone?: string;

  /**
   * Date of birth of the user (optional).
   */
  birthday?: Date;

  /**
   * Gender of the user (optional).
   */
  gender?: string;

  /**
   * Creates a new instance of UserProfile.
   * @param id - Unique identifier for the user profile.
   * @param userId - Identifier of the user to whom this profile belongs.
   * @param user - User object representing the relationship between the profile and the user.
   * @param phone - Phone number of the user (optional).
   * @param birthday - Date of birth of the user (optional).
   * @param gender - Gender of the user (optional).
   */
  constructor(
    id: number,
    userId: number,
    user: User,
    phone?: string,
    birthday?: Date,
    gender?: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.phone = phone;
    this.birthday = birthday;
    this.gender = gender;
  }
}
