import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from '../../src/application/services/user-profile.service';
import { IUserProfileRepository } from '../../src/domain/repositories/user-profile.repository';
import { UserProfile } from '../../src/domain/entities/user-profile.entity';
import { UserProfileDTO } from '../../src/presentation/dtos/user-profile.dto';

const mockUserProfileRepository = {
  createUserProfile: jest.fn(),
  getUserProfileById: jest.fn(),
  updateUserProfile: jest.fn(),
  deleteUserProfile: jest.fn(),
  getUserProfileByUserId: jest.fn(),
  updatePhoneNumber: jest.fn(),
  updateBirthday: jest.fn(),
  updateGender: jest.fn(),
  getUserProfilesByGender: jest.fn(),
  getUserProfilesByBirthdayRange: jest.fn(),
  isPhoneInUse: jest.fn(),
  profileExists: jest.fn(),
  getRecentlyUpdatedProfiles: jest.fn(),
  findMatchingProfiles: jest.fn(),
};

describe('UserProfileService', () => {
  let service: UserProfileService;
  let userProfileRepository: IUserProfileRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProfileService,
        {
          provide: 'UserProfileRepository',
          useValue: mockUserProfileRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<UserProfileService>(UserProfileService);
    userProfileRepository = module.get<IUserProfileRepository>(
      'UserProfileRepository',
    );
  });

  /* create user profile success and failure tests */
  it('should create user profile', async () => {
    /**
     * Tests the create user profile method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's createUserProfile method is called with the correct data.
     */

    const profileDTO: UserProfileDTO = {
      /* data */
    };

    const returnOject: UserProfile = { id: 1 /* others data */ };

    mockUserProfileRepository.createUserProfile.mockResolvedValue(returnOject);

    const result = await service.createUserProfile(profileDTO);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.createUserProfile).toHaveBeenCalledWith(
      profileDTO,
    );
  });

  it('should throw an error when create user profile method fails', async () => {
    const profileDTO: UserProfileDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockUserProfileRepository.createUserProfile.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.createUserProfile(profileDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get user profile by id success and failure tests */
  it('should get user profile by id', async () => {
    /**
     * Tests the get user profile by id method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's getUserProfileById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: UserProfile | null = { id: 1 /* others data */ };

    mockUserProfileRepository.getUserProfileById.mockResolvedValue(returnOject);

    const result = await service.getUserProfileById(id);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.getUserProfileById).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when get user profile by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockUserProfileRepository.getUserProfileById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getUserProfileById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update user profile success and failure tests */
  it('should update user profile', async () => {
    /**
     * Tests the update user profile method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's updateUserProfile method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<UserProfileDTO> = {
      /* data */
    };

    const returnOject: UserProfile = { id: 1 /* others data */ };

    mockUserProfileRepository.updateUserProfile.mockResolvedValue(returnOject);

    const result = await service.updateUserProfile(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.updateUserProfile).toHaveBeenCalledWith(
      id,
      updates,
    );
  });

  it('should throw an error when update user profile method fails', async () => {
    const id: number = 1;
    const updates: Partial<UserProfileDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockUserProfileRepository.updateUserProfile.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateUserProfile(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete user profile success and failure tests */
  it('should delete user profile', async () => {
    /**
     * Tests the delete user profile method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's deleteUserProfile method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockUserProfileRepository.deleteUserProfile.mockResolvedValue(returnOject);

    const result = await service.deleteUserProfile(id);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.deleteUserProfile).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when delete user profile method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockUserProfileRepository.deleteUserProfile.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteUserProfile(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get user profile by user id success and failure tests */
  it('should get user profile by user id', async () => {
    /**
     * Tests the get user profile by user id method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's getUserProfileByUserId method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: UserProfile | null = { id: 1 /* others data */ };

    mockUserProfileRepository.getUserProfileByUserId.mockResolvedValue(
      returnOject,
    );

    const result = await service.getUserProfileByUserId(userId);
    expect(result).toEqual(returnOject);
    expect(
      mockUserProfileRepository.getUserProfileByUserId,
    ).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get user profile by user id method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockUserProfileRepository.getUserProfileByUserId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getUserProfileByUserId(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update phone number success and failure tests */
  it('should update phone number', async () => {
    /**
     * Tests the update phone number method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's updatePhoneNumber method is called with the correct data.
     */

    const userId: number = 1;
    const phone: string = 'phone';

    const returnOject: UserProfile = { id: 1 /* others data */ };

    mockUserProfileRepository.updatePhoneNumber.mockResolvedValue(returnOject);

    const result = await service.updatePhoneNumber(userId, phone);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.updatePhoneNumber).toHaveBeenCalledWith(
      userId,
      phone,
    );
  });

  it('should throw an error when update phone number method fails', async () => {
    const userId: number = 1;
    const phone: string = 'phone';

    // Simulate a failure when calling the repository
    mockUserProfileRepository.updatePhoneNumber.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updatePhoneNumber(userId, phone);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update birthday success and failure tests */
  it('should update birthday', async () => {
    /**
     * Tests the update birthday method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's updateBirthday method is called with the correct data.
     */

    const userId: number = 1;
    const birthday: Date = {
      /* data */
    };

    const returnOject: UserProfile = { id: 1 /* others data */ };

    mockUserProfileRepository.updateBirthday.mockResolvedValue(returnOject);

    const result = await service.updateBirthday(userId, birthday);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.updateBirthday).toHaveBeenCalledWith(
      userId,
      birthday,
    );
  });

  it('should throw an error when update birthday method fails', async () => {
    const userId: number = 1;
    const birthday: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockUserProfileRepository.updateBirthday.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateBirthday(userId, birthday);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update gender success and failure tests */
  it('should update gender', async () => {
    /**
     * Tests the update gender method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's updateGender method is called with the correct data.
     */

    const userId: number = 1;
    const gender: string = 'gender';

    const returnOject: UserProfile = { id: 1 /* others data */ };

    mockUserProfileRepository.updateGender.mockResolvedValue(returnOject);

    const result = await service.updateGender(userId, gender);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.updateGender).toHaveBeenCalledWith(
      userId,
      gender,
    );
  });

  it('should throw an error when update gender method fails', async () => {
    const userId: number = 1;
    const gender: string = 'gender';

    // Simulate a failure when calling the repository
    mockUserProfileRepository.updateGender.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateGender(userId, gender);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get user profiles by gender success and failure tests */
  it('should get user profiles by gender', async () => {
    /**
     * Tests the get user profiles by gender method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's getUserProfilesByGender method is called with the correct data.
     */

    const gender: string = 'gender';

    const returnOject: UserProfile[] = [{ id: 1 /* others data */ }];

    mockUserProfileRepository.getUserProfilesByGender.mockResolvedValue(
      returnOject,
    );

    const result = await service.getUserProfilesByGender(gender);
    expect(result).toEqual(returnOject);
    expect(
      mockUserProfileRepository.getUserProfilesByGender,
    ).toHaveBeenCalledWith(gender);
  });

  it('should throw an error when get user profiles by gender method fails', async () => {
    const gender: string = 'gender';

    // Simulate a failure when calling the repository
    mockUserProfileRepository.getUserProfilesByGender.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getUserProfilesByGender(gender);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get user profiles by birthday range success and failure tests */
  it('should get user profiles by birthday range', async () => {
    /**
     * Tests the get user profiles by birthday range method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's getUserProfilesByBirthdayRange method is called with the correct data.
     */

    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    const returnOject: UserProfile[] = [{ id: 1 /* others data */ }];

    mockUserProfileRepository.getUserProfilesByBirthdayRange.mockResolvedValue(
      returnOject,
    );

    const result = await service.getUserProfilesByBirthdayRange(
      startDate,
      endDate,
    );
    expect(result).toEqual(returnOject);
    expect(
      mockUserProfileRepository.getUserProfilesByBirthdayRange,
    ).toHaveBeenCalledWith(startDate, endDate);
  });

  it('should throw an error when get user profiles by birthday range method fails', async () => {
    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockUserProfileRepository.getUserProfilesByBirthdayRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getUserProfilesByBirthdayRange(
      startDate,
      endDate,
    );
    expect(result).rejects.toThrow('Repository error');
  });

  /* is phone in use success and failure tests */
  it('should is phone in use', async () => {
    /**
     * Tests the is phone in use method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's isPhoneInUse method is called with the correct data.
     */

    const phone: string = 'phone';

    const returnOject: boolean = true;

    mockUserProfileRepository.isPhoneInUse.mockResolvedValue(returnOject);

    const result = await service.isPhoneInUse(phone);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.isPhoneInUse).toHaveBeenCalledWith(phone);
  });

  it('should throw an error when is phone in use method fails', async () => {
    const phone: string = 'phone';

    // Simulate a failure when calling the repository
    mockUserProfileRepository.isPhoneInUse.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.isPhoneInUse(phone);
    expect(result).rejects.toThrow('Repository error');
  });

  /* profile exists success and failure tests */
  it('should profile exists', async () => {
    /**
     * Tests the profile exists method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's profileExists method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: boolean = true;

    mockUserProfileRepository.profileExists.mockResolvedValue(returnOject);

    const result = await service.profileExists(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.profileExists).toHaveBeenCalledWith(
      userId,
    );
  });

  it('should throw an error when profile exists method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockUserProfileRepository.profileExists.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.profileExists(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get recently updated profiles success and failure tests */
  it('should get recently updated profiles', async () => {
    /**
     * Tests the get recently updated profiles method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's getRecentlyUpdatedProfiles method is called with the correct data.
     */

    const limit: number = 1;

    const returnOject: UserProfile[] = [{ id: 1 /* others data */ }];

    mockUserProfileRepository.getRecentlyUpdatedProfiles.mockResolvedValue(
      returnOject,
    );

    const result = await service.getRecentlyUpdatedProfiles(limit);
    expect(result).toEqual(returnOject);
    expect(
      mockUserProfileRepository.getRecentlyUpdatedProfiles,
    ).toHaveBeenCalledWith(limit);
  });

  it('should throw an error when get recently updated profiles method fails', async () => {
    const limit: number = 1;

    // Simulate a failure when calling the repository
    mockUserProfileRepository.getRecentlyUpdatedProfiles.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getRecentlyUpdatedProfiles(limit);
    expect(result).rejects.toThrow('Repository error');
  });

  /* find matching profiles success and failure tests */
  it('should find matching profiles', async () => {
    /**
     * Tests the find matching profiles method.
     * Verifies that the returned userProfile matches the expected one
     * and that the repository's findMatchingProfiles method is called with the correct data.
     */

    const criteria: Partial<UserProfileDTO> = {
      /* data */
    };

    const returnOject: UserProfile[] = [{ id: 1 /* others data */ }];

    mockUserProfileRepository.findMatchingProfiles.mockResolvedValue(
      returnOject,
    );

    const result = await service.findMatchingProfiles(criteria);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.findMatchingProfiles).toHaveBeenCalledWith(
      criteria,
    );
  });

  it('should throw an error when find matching profiles method fails', async () => {
    const criteria: Partial<UserProfileDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockUserProfileRepository.findMatchingProfiles.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.findMatchingProfiles(criteria);
    expect(result).rejects.toThrow('Repository error');
  });
});
