import { UserProfile } from '../../../domain/entities/user-profile.entity';
import { UserProfileDTO } from '../../../presentation/dtos/user-profile.dto';
import { fromUserDTO } from './to.user.entity';

/**
 * Converts a UserProfileDTO to a UserProfile entity.
 * @param userProfileDTO - The UserProfileDTO to convert.
 * @returns The corresponding UserProfile entity.
 */
export function fromUserProfileDTO(
  userProfileDTO: UserProfileDTO | Partial<UserProfileDTO>,
): UserProfile {
  return new UserProfile(
    userProfileDTO.id,
    userProfileDTO.userId,
    userProfileDTO.user ? fromUserDTO(userProfileDTO.user) : undefined,
    userProfileDTO.phone,
    userProfileDTO.birthday,
    userProfileDTO.gender,
  );
}
