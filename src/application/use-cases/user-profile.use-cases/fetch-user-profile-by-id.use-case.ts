import { Injectable } from '@nestjs/common';
import { UserProfileService } from 'src/application/services/user-profile.service';
import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
import { toUserProfileDTO } from 'src/application/helper/to-dto/to.user-profile.dto';

/**
 * Use case class for fetching a user profile by its ID.
 * This class interacts with the UserProfile service to retrieve a user profile by ID.
 */
@Injectable()
export class FetchUserProfileById {
  constructor(private readonly profileService: UserProfileService) {}

  /**
   * Execute the fetch-user-profile-by-id use case.
   * @param id - The unique ID of the user profile to retrieve.
   * @returns A promise that resolves to the UserProfile DTO if found, otherwise null.
   */
  async execute(id: number): Promise<UserProfileDTO | null> {
    const profile = await this.profileService.getUserProfileById(id);
    if (!profile) return null;
    return toUserProfileDTO(profile);
  }
}
