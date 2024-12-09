import { Injectable } from '@nestjs/common';
import { UserProfileService } from '../../../application/services/user-profile.service';

/**
 * Use case class for checking if a phone number is in use.
 * This class interacts with the UserProfile service to verify phone number usage.
 */
@Injectable()
export class IsPhoneInUse {
  constructor(private readonly profileService: UserProfileService) { }

  /**
   * Execute the is-phone-in-use use case.
   * @param phone - The phone number to check.
   * @returns A promise that resolves to a boolean indicating if the phone number is already in use.
   */
  async execute(phone: string): Promise<boolean> {
    return this.profileService.isPhoneInUse(phone);
  }
}
