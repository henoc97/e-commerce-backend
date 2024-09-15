import { Injectable } from '@nestjs/common';
import { UserProfileService } from 'src/application/services/user-profile.service';
import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
import { toUserProfileDTO } from 'src/application/helper/to-dto/to.user-profile.dto';

/**
 * Use case class for creating user profiles.
 * This class interacts with the UserProfile service to create a new user profile.
 */
@Injectable()
export class CreateUserProfile {
  constructor(private readonly profileService: UserProfileService) {}

  /**
   * Execute the create-user-profile use case.
   * @param profileDTO - Data Transfer Object containing user profile data to be created.
   * @returns A promise that resolves to the created UserProfile DTO, or null if creation fails.
   */
  async execute(profileDTO: UserProfileDTO): Promise<UserProfileDTO | null> {
    const profile = await this.profileService.createUserProfile(profileDTO);
    if (!profile) return null;
    return toUserProfileDTO(profile);
  }
}
