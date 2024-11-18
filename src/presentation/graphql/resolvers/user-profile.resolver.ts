import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserProfile } from 'src/application/use-cases/user-profile.use-cases/create-user-profile.use-case';
import { UserProfileDTO } from 'src/presentation/dtos/user-profile.dto';
import { DeleteUserProfile } from 'src/application/use-cases/user-profile.use-cases/delete-user-profile.use-case';
// import { FetchRecentlyUpdatedProfiles } from 'src/application/use-cases/user-profile.use-cases/fetch-recently-updated-profiles.use-case';
import { FetchUserProfileById } from 'src/application/use-cases/user-profile.use-cases/fetch-user-profile-by-id.use-case';
import { FetchUserProfileByUserId } from 'src/application/use-cases/user-profile.use-cases/fetch-user-profile-by-user-id.use-case';
import { FetchUserProfilesByBirthdayRange } from 'src/application/use-cases/user-profile.use-cases/fetch-user-profiles-by-birthday-range.use-case';
import { FetchUserProfilesByGender } from 'src/application/use-cases/user-profile.use-cases/fetch-user-profiles-by-gender.use-case';
import { FindMatchingProfiles } from 'src/application/use-cases/user-profile.use-cases/find-matching-profiles.use-case';
import { IsPhoneInUse } from 'src/application/use-cases/user-profile.use-cases/is-phone-in-use.use-case';
import { UpdateUserProfile } from 'src/application/use-cases/user-profile.use-cases/update-user-profile.use-case';
import { UserProfile } from 'src/generated/graphql';
import { transformUserProfileDTOToGraphQL } from 'src/application/helper/utils/transformers';

@Resolver(() => UserProfileDTO)
export class UserProfileResolver {
  constructor(
    private readonly createUserProfileUseCase: CreateUserProfile,
    private readonly deleteUserProfileUseCase: DeleteUserProfile,
    // private readonly fetchRecentlyUpdatedProfilesUseCase: FetchRecentlyUpdatedProfiles,
    private readonly fetchUserProfileByIdUseCase: FetchUserProfileById,
    private readonly fetchUserProfileByUserIdUseCase: FetchUserProfileByUserId,
    private readonly fetchUserProfilesByBirthdayRangeUseCase: FetchUserProfilesByBirthdayRange,
    private readonly fetchUserProfilesByGenderUseCase: FetchUserProfilesByGender,
    private readonly findMatchingProfilesUseCase: FindMatchingProfiles,
    private readonly isPhoneInUseUseCase: IsPhoneInUse,
    private readonly updateUserProfileUseCase: UpdateUserProfile,
  ) { }

  @Mutation(() => UserProfileDTO, { nullable: true })
  async createUserProfile(
    @Args('profile') profileDTO: UserProfileDTO,
  ): Promise<UserProfile | null> {
    const result = await this.createUserProfileUseCase.execute(profileDTO);
    return transformUserProfileDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deleteUserProfile(@Args('id') id: number): Promise<boolean> {
    return this.deleteUserProfileUseCase.execute(id);
  }

  // @Query(() => [UserProfileDTO])
  // async fetchRecentlyUpdatedProfiles(
  //   @Args('limit') limit: number,
  // ): Promise<UserProfile[]> {
  //   const result = awaiteturn this.fetchRecentlyUpdatedProfilesUseCase.execute(limit);
  // return result.map(transformUserProfileDTOToGraphQL)
  // }

  @Query(() => UserProfileDTO, { nullable: true })
  async fetchUserProfileById(
    @Args('id') id: number,
  ): Promise<UserProfile | null> {
    const result = await this.fetchUserProfileByIdUseCase.execute(id);
    return transformUserProfileDTOToGraphQL(result)
  }

  @Query(() => UserProfileDTO, { nullable: true })
  async fetchUserProfileByUserId(
    @Args('userId') userId: number,
  ): Promise<UserProfile | null> {
    const result = await this.fetchUserProfileByUserIdUseCase.execute(userId);
    return transformUserProfileDTOToGraphQL(result)
  }

  @Query(() => [UserProfileDTO])
  async fetchUserProfilesByBirthdayRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<UserProfile[]> {
    const result = await this.fetchUserProfilesByBirthdayRangeUseCase.execute(
      startDate,
      endDate,
    );
    return result.map(transformUserProfileDTOToGraphQL)
  }

  @Query(() => [UserProfileDTO])
  async fetchUserProfilesByGender(
    @Args('gender') gender: string,
  ): Promise<UserProfile[]> {
    const result = await this.fetchUserProfilesByGenderUseCase.execute(gender);
    return result.map(transformUserProfileDTOToGraphQL)
  }

  @Query(() => [UserProfileDTO])
  async findMatchingProfiles(
    @Args('criteria') criteria: UserProfileDTO,
  ): Promise<UserProfile[]> {
    const result = await this.findMatchingProfilesUseCase.execute(criteria);
    return result.map(transformUserProfileDTOToGraphQL)
  }

  @Query(() => Boolean)
  async isPhoneInUse(@Args('phone') phone: string): Promise<boolean> {
    return this.isPhoneInUseUseCase.execute(phone);
  }

  @Mutation(() => UserProfileDTO, { nullable: true })
  async updateUserProfile(
    @Args('id') id: number,
    @Args('profile') profileDTO: UserProfileDTO,
  ): Promise<UserProfile | null> {
    const result = await this.updateUserProfileUseCase.execute(id, profileDTO);
    return transformUserProfileDTOToGraphQL(result)
  }

  // ... autres résolveurs pour chaque use-case ...
}
