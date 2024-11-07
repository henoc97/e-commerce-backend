import { Module } from '@nestjs/common';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileRepository } from 'src/infrastructure/persistences/user-profile.repository.impl';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserProfile } from '../use-cases/user-profile.use-cases/create-user-profile.use-case';
import { UpdateUserProfile } from '../use-cases/user-profile.use-cases/update-user-profile.use-case';
import { DeleteUserProfile } from '../use-cases/user-profile.use-cases/delete-user-profile.use-case';
import { FetchUserProfileById } from '../use-cases/user-profile.use-cases/fetch-user-profile-by-id.use-case';
import { FetchUserProfileByUserId } from '../use-cases/user-profile.use-cases/fetch-user-profile-by-user-id.use-case';
import { FindMatchingProfiles } from '../use-cases/user-profile.use-cases/find-matching-profiles.use-case';
import { FetchUserProfilesByGender } from '../use-cases/user-profile.use-cases/fetch-user-profiles-by-gender.use-case';
import { IsPhoneInUse } from '../use-cases/user-profile.use-cases/is-phone-in-use.use-case';
import { FetchUserProfilesByBirthdayRange } from '../use-cases/user-profile.use-cases/fetch-user-profiles-by-birthday-range.use-case';

const userProfileUseCases = [
  CreateUserProfile,
  UpdateUserProfile,
  DeleteUserProfile,
  FetchUserProfileById,
  FetchUserProfileByUserId,
  FindMatchingProfiles,
  FetchUserProfilesByGender,
  IsPhoneInUse,
  FetchUserProfilesByBirthdayRange,
];

@Module({
  providers: [
    UserProfileService,
    PrismaService,
    {
      provide: 'IUserProfileRepository',
      useClass: UserProfileRepository,
    },
    ...userProfileUseCases,
  ],
  exports: [UserProfileService, ...userProfileUseCases],
})
export class UserProfileModule { }
