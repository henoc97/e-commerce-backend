import { UserProfile } from 'src/domain/entities/user-profile.entity';
import { fromUserPrisma } from './to.user.entity';

/**
 * Converts a UserProfilePrisma to a UserProfile entity.
 * @param userProfilePrisma - The UserProfilePrisma to convert.
 * @returns The corresponding UserProfile entity.
 */
export function fromUserProfilePrisma(userProfilePrisma: any): UserProfile {
  return new UserProfile(
    userProfilePrisma.id,
    userProfilePrisma.userId,
    userProfilePrisma.user ? fromUserPrisma(userProfilePrisma.user) : undefined,
    userProfilePrisma.phone,
    userProfilePrisma.birthday,
    userProfilePrisma.gender,
  );
}
