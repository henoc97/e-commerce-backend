import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from '../../src/application/services/user-profile.service';
import { IUserProfileRepository } from '../../src/domain/repositories/user-profile.repository';
import { UserProfile } from '../../src/domain/entities/user-profile.entity';
import { UserProfileDTO } from '../../src/presentation/dtos/user-profile.dto';


const mockUserProfileRepository = {
  create: jest.fn(),
getById: jest.fn(),
update: jest.fn(),
remove: jest.fn(),
getByUserId: jest.fn(),
updatePhone: jest.fn(),
updateBirthday: jest.fn(),
updateGender: jest.fn(),
getByGender: jest.fn(),
getByBirthdayRange: jest.fn(),
isPhoneInUse: jest.fn(),
exists: jest.fn(),
getRecentlyUpdated: jest.fn(),
findMatches: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('UserProfileService', () => {
    let service: UserProfileService;
    let userProfileRepository: IUserProfileRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProfileService,
        {
          provide: 'IUserProfileRepository',
          useValue: mockUserProfileRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<UserProfileService>(UserProfileService);
    userProfileRepository = module.get<IUserProfileRepository>('IUserProfileRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create user profile success and failure tests */
it('should create user profile', async () => {
    /** 
     * Tests the create user profile method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's createUserProfile method is called with the correct data.
     */
    
     const profileDTO: UserProfileDTO = { /* data */ };

    const returnOject: UserProfile = { id: 1, /* others data */ };
    
    mockUserProfileRepository.create.mockResolvedValue(returnOject);

    const result = await service.createUserProfile(profileDTO);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.create).toHaveBeenCalledWith(profileDTO);
});

it('should throw an error when create user profile method fails', async () => {
    
     const profileDTO: UserProfileDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createUserProfile(profileDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user profile by id success and failure tests */
it('should get user profile by id', async () => {
    /** 
     * Tests the get user profile by id method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's getUserProfileById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: UserProfile | null = { id: 1, /* others data */ };
    
    mockUserProfileRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getUserProfileById(id);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get user profile by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserProfileById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update user profile success and failure tests */
it('should update user profile', async () => {
    /** 
     * Tests the update user profile method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's updateUserProfile method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<UserProfileDTO> = { /* data */ };

    const returnOject: UserProfile = { id: 1, /* others data */ };
    
    mockUserProfileRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateUserProfile(id,
    updates,);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.update).toHaveBeenCalledWith(id,
    updates,);
});

it('should throw an error when update user profile method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<UserProfileDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.update.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateUserProfile(id,
    updates,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete user profile success and failure tests */
it('should delete user profile', async () => {
    /** 
     * Tests the delete user profile method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's deleteUserProfile method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockUserProfileRepository.remove.mockResolvedValue(returnOject);

    const result = await service.deleteUserProfile(id);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.remove).toHaveBeenCalledWith(id);
});

it('should throw an error when delete user profile method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.remove.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteUserProfile(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user profile by user id success and failure tests */
it('should get user profile by user id', async () => {
    /** 
     * Tests the get user profile by user id method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's getUserProfileByUserId method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: UserProfile | null = { id: 1, /* others data */ };
    
    mockUserProfileRepository.getByUserId.mockResolvedValue(returnOject);

    const result = await service.getUserProfileByUserId(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.getByUserId).toHaveBeenCalledWith(userId);
});

it('should throw an error when get user profile by user id method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.getByUserId.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserProfileByUserId(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
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

    const returnOject: UserProfile = { id: 1, /* others data */ };
    
    mockUserProfileRepository.updatePhone.mockResolvedValue(returnOject);

    const result = await service.updatePhoneNumber(userId, phone);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.updatePhone).toHaveBeenCalledWith(userId, phone);
});

it('should throw an error when update phone number method fails', async () => {
    
     const userId: number = 1;
     const phone: string = 'phone';
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.updatePhone.mockRejectedValue(new Error('Repository error'));

    await expect(service.updatePhoneNumber(userId, phone)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update birthday success and failure tests */
it('should update birthday', async () => {
    /** 
     * Tests the update birthday method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's updateBirthday method is called with the correct data.
     */
    
     const userId: number = 1;
     const birthday: Date = { /* data */ };

    const returnOject: UserProfile = { id: 1, /* others data */ };
    
    mockUserProfileRepository.updateBirthday.mockResolvedValue(returnOject);

    const result = await service.updateBirthday(userId, birthday);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.updateBirthday).toHaveBeenCalledWith(userId, birthday);
});

it('should throw an error when update birthday method fails', async () => {
    
     const userId: number = 1;
     const birthday: Date = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.updateBirthday.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateBirthday(userId, birthday)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
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

    const returnOject: UserProfile = { id: 1, /* others data */ };
    
    mockUserProfileRepository.updateGender.mockResolvedValue(returnOject);

    const result = await service.updateGender(userId, gender);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.updateGender).toHaveBeenCalledWith(userId, gender);
});

it('should throw an error when update gender method fails', async () => {
    
     const userId: number = 1;
     const gender: string = 'gender';
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.updateGender.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateGender(userId, gender)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user profiles by gender success and failure tests */
it('should get user profiles by gender', async () => {
    /** 
     * Tests the get user profiles by gender method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's getUserProfilesByGender method is called with the correct data.
     */
    
     const gender: string = 'gender';

    const returnOject: UserProfile[] = [{ id: 1, /* others data */ }];
    
    mockUserProfileRepository.getByGender.mockResolvedValue(returnOject);

    const result = await service.getUserProfilesByGender(gender);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.getByGender).toHaveBeenCalledWith(gender);
});

it('should throw an error when get user profiles by gender method fails', async () => {
    
     const gender: string = 'gender';
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.getByGender.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserProfilesByGender(gender)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user profiles by birthday range success and failure tests */
it('should get user profiles by birthday range', async () => {
    /** 
     * Tests the get user profiles by birthday range method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's getUserProfilesByBirthdayRange method is called with the correct data.
     */
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };

    const returnOject: UserProfile[] = [{ id: 1, /* others data */ }];
    
    mockUserProfileRepository.getByBirthdayRange.mockResolvedValue(returnOject);

    const result = await service.getUserProfilesByBirthdayRange(startDate,
    endDate,);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.getByBirthdayRange).toHaveBeenCalledWith(startDate,
    endDate,);
});

it('should throw an error when get user profiles by birthday range method fails', async () => {
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.getByBirthdayRange.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserProfilesByBirthdayRange(startDate,
    endDate,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* is phone in use success and failure tests */
it('should is phone in use', async () => {
    /** 
     * Tests the is phone in use method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's isPhoneInUse method is called with the correct data.
     */
    
     const phone: string = 'phone';

    const returnOject: boolean = true
    
    mockUserProfileRepository.isPhoneInUse.mockResolvedValue(returnOject);

    const result = await service.isPhoneInUse(phone);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.isPhoneInUse).toHaveBeenCalledWith(phone);
});

it('should throw an error when is phone in use method fails', async () => {
    
     const phone: string = 'phone';
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.isPhoneInUse.mockRejectedValue(new Error('Repository error'));

    await expect(service.isPhoneInUse(phone)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* profile exists success and failure tests */
it('should profile exists', async () => {
    /** 
     * Tests the profile exists method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's profileExists method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: boolean = true
    
    mockUserProfileRepository.exists.mockResolvedValue(returnOject);

    const result = await service.profileExists(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.exists).toHaveBeenCalledWith(userId);
});

it('should throw an error when profile exists method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.exists.mockRejectedValue(new Error('Repository error'));

    await expect(service.profileExists(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get recently updated profiles success and failure tests */
it('should get recently updated profiles', async () => {
    /** 
     * Tests the get recently updated profiles method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's getRecentlyUpdatedProfiles method is called with the correct data.
     */
    
     const limit: number = 1;

    const returnOject: UserProfile[] = [{ id: 1, /* others data */ }];
    
    mockUserProfileRepository.getRecentlyUpdated.mockResolvedValue(returnOject);

    const result = await service.getRecentlyUpdatedProfiles(limit);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.getRecentlyUpdated).toHaveBeenCalledWith(limit);
});

it('should throw an error when get recently updated profiles method fails', async () => {
    
     const limit: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.getRecentlyUpdated.mockRejectedValue(new Error('Repository error'));

    await expect(service.getRecentlyUpdatedProfiles(limit)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* find matching profiles success and failure tests */
it('should find matching profiles', async () => {
    /** 
     * Tests the find matching profiles method.
     * Verifies that the returned userProfile matches the expected one 
     * and that the repository's findMatchingProfiles method is called with the correct data.
     */
    
     const criteria: Partial<UserProfileDTO> = { /* data */ };

    const returnOject: UserProfile[] = [{ id: 1, /* others data */ }];
    
    mockUserProfileRepository.findMatches.mockResolvedValue(returnOject);

    const result = await service.findMatchingProfiles(criteria,);
    expect(result).toEqual(returnOject);
    expect(mockUserProfileRepository.findMatches).toHaveBeenCalledWith(criteria,);
});

it('should throw an error when find matching profiles method fails', async () => {
    
     const criteria: Partial<UserProfileDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserProfileRepository.findMatches.mockRejectedValue(new Error('Repository error'));

    await expect(service.findMatchingProfiles(criteria,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})
