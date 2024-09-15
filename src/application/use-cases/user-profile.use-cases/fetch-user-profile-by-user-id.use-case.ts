import { Injectable } from '@nestjs/common';
import { UserProfileService } from 'src/application/services/user-profile.service';
import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
import { toUserProfileDTO } from 'src/application/helper/to-dto/to.user-profile.dto';

/**
 * Use case class for fetching a user profile by user ID.
 * This class interacts with the UserProfile service to retrieve a user profile by user ID.
 */
@Injectable()
export class FetchUserProfileByUserId {
  constructor(private readonly profileService: UserProfileService) {}

  /**
   * Execute the fetch-user-profile-by-user-id use case.
   * @param userId - The user ID of the profile to retrieve.
   * @returns A promise that resolves to the UserProfile DTO if found, otherwise null.
   */
  async execute(userId: number): Promise<UserProfileDTO | null> {
    const profile = await this.profileService.getUserProfileByUserId(userId);
    if (!profile) return null;
    return toUserProfileDTO(profile);
  }
}
