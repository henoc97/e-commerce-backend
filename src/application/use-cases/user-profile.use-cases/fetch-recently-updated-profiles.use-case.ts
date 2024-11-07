// import { Injectable } from '@nestjs/common';
// import { UserProfileService } from 'src/application/services/user-profile.service';
// import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
// import { toUserProfileDTO } from 'src/application/helper/to-dto/to.user-profile.dto';

// /**
//  * Use case class for fetching recently updated user profiles.
//  * This class interacts with the UserProfile service to retrieve recently updated profiles.
//  */
// @Injectable()
// export class FetchRecentlyUpdatedProfiles {
//   constructor(private readonly profileService: UserProfileService) {}

//   /**
//    * Execute the fetch-recently-updated-profiles use case.
//    * @param limit - The number of recent profiles to retrieve.
//    * @returns A promise that resolves to an array of recently updated UserProfile DTOs.
//    */
//   async execute(limit: number): Promise<UserProfileDTO[]> {
//     const profiles =
//       await this.profileService.getRecentlyUpdatedProfiles(limit);
//     return profiles.map(toUserProfileDTO);
//   }
// }
