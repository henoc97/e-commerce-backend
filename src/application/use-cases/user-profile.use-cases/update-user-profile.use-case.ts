import { Injectable } from '@nestjs/common';
import { UserProfileService } from 'src/application/services/user-profile.service';
import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
import { toUserProfileDTO } from 'src/application/helper/to-dto/to.user-profile.dto';

/**
 * Use case class for updating user profiles.
 * This class interacts with the UserProfile service to update an existing user profile.
 */
@Injectable()
export class UpdateUserProfile {
  constructor(private readonly profileService: UserProfileService) {}

  /**
   * Execute the update-user-profile use case.
   * @param id - The unique ID of the user profile to update.
   * @param profileDTO - Partial fields to update.
   * @returns A promise that resolves to the updated UserProfile DTO, or null if update fails.
   */
  async execute(
    id: number,
    profileDTO: Partial<UserProfileDTO>,
  ): Promise<UserProfileDTO | null> {
    const updatedProfile = await this.profileService.updateUserProfile(
      id,
      profileDTO,
    );
    if (!updatedProfile) return null;
    return toUserProfileDTO(updatedProfile);
  }
}
