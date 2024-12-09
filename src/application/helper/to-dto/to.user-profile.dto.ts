import { UserProfile } from '../../../domain/entities/user-profile.entity';
import { UserProfileDTO } from '../../../presentation/dtos/user-profile.dto';
import { toUserDTO } from './to.user.dto';

/**
 * Converts a UserProfile entity to UserProfileDTO.
 * @param userProfile - The UserProfile entity to convert.
 * @returns The corresponding UserProfileDTO.
 */
export function toUserProfileDTO(userProfile: any): UserProfileDTO {
  return new UserProfileDTO(
    userProfile.id,
    userProfile.userId,
    userProfile.user ? toUserDTO(userProfile.user) : undefined,
    userProfile.phone,
    userProfile.birthday,
    userProfile.gender,
  );
}
