import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from '../../../src/application/services/user-profile.service';
import { FetchUserProfileById } from '../../../src/application/use-cases/user-profile.use-cases/fetch-user-profile-by-id.use-case';
import { UserProfileDTO } from '../../../src/presentation/dtos/user-profile.dto';
import { toUserProfileDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchUserProfileById use case.
 * This test covers the initialization and behavior of the FetchUserProfileById class.
 * It mocks the UserProfileService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchUserProfileById', () => {
  let fetchUserProfileById: FetchUserProfileById;
  let userProfileService: UserProfileService;

  // Mock implementation of the UserProfileService service with jest functions
  const mockUserProfileService = {
    fetchUserProfileById: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const id: number = 1;

  // Mock version of  to be used as input and expected output
  const mockUserProfileDTO: UserProfileDTO = {
    // TODO: Fill in your UserProfileDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchUserProfileById,
        {
          provide: UserProfileService,
          useValue: mockUserProfileService,
        },
      ],
    }).compile();

    fetchUserProfileById = module.get<FetchUserProfileById>(FetchUserProfileById);
    userProfileService = module.get<UserProfileService>(UserProfileService);
  });

  /**
   * After each test, clear all jest mocks.
   * This ensures no interference between tests and guarantees a clean test environment.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case to verify that the use case executes successfully and returns a DTO.
   * This test ensures that the service method is called correctly and that the result is processed by 	o.
   */
  it('should create and return an address DTO', async () => {
    // Mock service returning the expected DTO
    mockUserProfileService.fetchUserProfileById.mockResolvedValue(mockUserProfileDTO);
    (toUserProfileDTO as jest.Mock).mockReturnValue(mockUserProfileDTO);

    // Execute the use case with provided parameters
    const result = await fetchUserProfileById.execute(id);

    // Verify that the service was called with the expected arguments
    expect(mockUserProfileService.fetchUserProfileById).toHaveBeenCalledWith(id);

    // Verify that the transformation to DTO was called with the service result
    expect(toUserProfileDTO).toHaveBeenCalledWith(mockUserProfileDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockUserProfileDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchUserProfileById execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockUserProfileService.fetchUserProfileById.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(fetchUserProfileById.execute(id)).rejects.toThrow('Service method error');
  });
});
