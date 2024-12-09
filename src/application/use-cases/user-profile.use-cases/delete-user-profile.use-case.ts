import { Injectable } from '@nestjs/common';
import { UserProfileService } from '../../../application/services/user-profile.service';

/**
 * Use case class for deleting user profiles.
 * This class interacts with the UserProfile service to delete a user profile by ID.
 */
@Injectable()
export class DeleteUserProfile {
  constructor(private readonly profileService: UserProfileService) { }

  /**
   * Execute the delete-user-profile use case.
   * @param id - The unique ID of the user profile to be deleted.
   * @returns A promise that resolves to a boolean indicating if the deletion was successful.
   */
  async execute(id: number): Promise<boolean> {
    return this.profileService.deleteUserProfile(id);
  }
}
