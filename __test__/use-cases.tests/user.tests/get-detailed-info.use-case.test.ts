import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/application/services/user.service';
import { GetDetailedInfo } from '../../../src/application/use-cases/user.use-cases/get-detailed-info.use-case';
import { UserDTO } from '../../../src/presentation/dtos/user.dto';
import { toUserDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the GetDetailedInfo use case.
 * This test covers the initialization and behavior of the GetDetailedInfo class.
 * It mocks the UserService service and verifies that the use case handles the business logic as expected.
 */
describe('GetDetailedInfo', () => {
  let getDetailedInfo: GetDetailedInfo;
  let userService: UserService;

  // Mock implementation of the UserService service with jest functions
  const mockUserService = {
    getDetailedInfo: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const userId: number = 1;

  // Mock version of  to be used as input and expected output
  const mockUserDTO: UserDTO = {
    // TODO: Fill in your UserDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetDetailedInfo,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    getDetailedInfo = module.get<GetDetailedInfo>(GetDetailedInfo);
    userService = module.get<UserService>(UserService);
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
    mockUserService.getDetailedInfo.mockResolvedValue(mockUserDTO);
    (toUserDTO as jest.Mock).mockReturnValue(mockUserDTO);

    // Execute the use case with provided parameters
    const result = await getDetailedInfo.execute(userId);

    // Verify that the service was called with the expected arguments
    expect(mockUserService.getDetailedInfo).toHaveBeenCalledWith(userId);

    // Verify that the transformation to DTO was called with the service result
    expect(toUserDTO).toHaveBeenCalledWith(mockUserDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockUserDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when getDetailedInfo execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockUserService.getDetailedInfo.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(getDetailedInfo.execute(userId)).rejects.toThrow('Service method error');
  });
});
