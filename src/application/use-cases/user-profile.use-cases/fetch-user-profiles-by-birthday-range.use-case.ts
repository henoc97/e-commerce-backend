import { Injectable } from '@nestjs/common';
import { UserProfileService } from 'src/application/services/user-profile.service';
import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
import { toUserProfileDTO } from 'src/application/helper/to-dto/to.user-profile.dto';

/**
 * Use case class for fetching user profiles within a birthday range.
 * This class interacts with the UserProfile service to retrieve profiles based on birthday range.
 */
@Injectable()
export class FetchUserProfilesByBirthdayRange {
  constructor(private readonly profileService: UserProfileService) {}

  /**
   * Execute the fetch-user-profiles-by-birthday-range use case.
   * @param startDate - The start date of the birthday range.
   * @param endDate - The end date of the birthday range.
   * @returns A promise that resolves to an array of UserProfile DTOs within the specified range.
   */
  async execute(startDate: Date, endDate: Date): Promise<UserProfileDTO[]> {
    const profiles = await this.profileService.getUserProfilesByBirthdayRange(
      startDate,
      endDate,
    );
    return profiles.map(toUserProfileDTO);
  }
}
