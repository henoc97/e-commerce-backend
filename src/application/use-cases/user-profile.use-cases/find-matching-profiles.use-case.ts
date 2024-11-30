import { Injectable } from '@nestjs/common';
import { UserProfileService } from 'src/application/services/user-profile.service';
import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
import { toUserProfileDTO } from 'src/application/helper/to-dto/to.user-profile.dto';

/**
 * Use case class for finding matching user profiles.
 * This class interacts with the UserProfile service to find profiles that match certain criteria.
 */
@Injectable()
export class FindMatchingProfiles {
  constructor(private readonly profileService: UserProfileService) { }

  /**
   * Execute the find-matching-profiles use case.
   * @param criteria - Partial data for matching profiles (e.g., similar interests, age, etc.).
   * @returns A promise that resolves to an array of matched UserProfile DTOs.
   */
  async execute(criteria: Partial<UserProfileDTO>): Promise<UserProfileDTO[]> {
    const profiles = await this.profileService.findMatchingProfiles(criteria);
    return profiles?.map(toUserProfileDTO);
  }
}
