import { IsInt, IsOptional, IsString, IsDate, IsPhoneNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDTO } from './user.dto';

/**
 * Data Transfer Object for UserProfile.
 * Used for validating and transforming user profile data in API requests and responses.
 */
export class UserProfileDTO {
  /**
   * Unique identifier for the user profile.
   */
  @IsInt()
  id: number;

  /**
   * Identifier of the user to whom this profile belongs.
   */
  @IsInt()
  userId: number;

  /**
   * User object representing the relationship between the profile and the user.
   */
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  /**
   * Phone number of the user.
   * Should follow the international phone number format.
   */
  @IsOptional()
  @IsPhoneNumber(null) // Use null for any region or specify a region code if needed.
  phone?: string;

  /**
   * Date of birth of the user.
   */
  @IsOptional()
  @IsDate()
  birthday?: Date;

  /**
   * Gender of the user.
   */
  @IsOptional()
  @IsString()
  gender?: string;

  /**
   * Creates a new UserProfileDTO instance.
   * @param id - Unique identifier for the user profile.
   * @param userId - Identifier of the user to whom this profile belongs.
   * @param user - User object representing the relationship between the profile and the user.
   * @param phone - (Optional) Phone number of the user.
   * @param birthday - (Optional) Date of birth of the user.
   * @param gender - (Optional) Gender of the user.
   */
  constructor(
    id: number,
    userId: number,
    user: UserDTO,
    phone?: string,
    birthday?: Date,
    gender?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.phone = phone;
    this.birthday = birthday;
    this.gender = gender;
  }
}
