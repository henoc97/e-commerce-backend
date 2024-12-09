import { Injectable } from '@nestjs/common';
import { UserProfileService } from '../../../application/services/user-profile.service';
import { UserProfileDTO } from '../../../presentation/dtos/user-profile.dto';
import { toUserProfileDTO } from '../../../application/helper/to-dto/to.user-profile.dto';

/**
 * Use case class for fetching user profiles by gender.
 * This class interacts with the UserProfile service to retrieve profiles based on gender.
 */
@Injectable()
export class FetchUserProfilesByGender {
  constructor(private readonly profileService: UserProfileService) { }

  /**
   * Execute the fetch-user-profiles-by-gender use case.
   * @param gender - The gender to filter user profiles by.
   * @returns A promise that resolves to an array of UserProfile DTOs with the specified gender.
   */
  async execute(gender: string): Promise<UserProfileDTO[]> {
    const profiles = await this.profileService.getUserProfilesByGender(gender);
    return profiles?.map(toUserProfileDTO);
  }
}
