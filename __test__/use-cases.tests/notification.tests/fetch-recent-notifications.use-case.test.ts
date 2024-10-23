import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../../../src/application/services/notification.service';
import { FetchRecentNotifications } from '../../../src/application/use-cases/notification.use-cases/fetch-recent-notifications.use-case';
import { NotificationDTO } from '../../../src/presentation/dtos/notification.dto';
import { toNotificationDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchRecentNotifications use case.
 * This test covers the initialization and behavior of the FetchRecentNotifications class.
 * It mocks the NotificationService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchRecentNotifications', () => {
  let fetchRecentNotifications: FetchRecentNotifications;
  let notificationService: NotificationService;

  // Mock implementation of the NotificationService service with jest functions
  const mockNotificationService = {
    fetchRecentNotifications: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const userId: number = 1;

  // Mock version of  to be used as input and expected output
  const mockNotificationDTO: NotificationDTO = {
    // TODO: Fill in your NotificationDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchRecentNotifications,
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    fetchRecentNotifications = module.get<FetchRecentNotifications>(FetchRecentNotifications);
    notificationService = module.get<NotificationService>(NotificationService);
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
    mockNotificationService.fetchRecentNotifications.mockResolvedValue(mockNotificationDTO);
    (toNotificationDTO as jest.Mock).mockReturnValue(mockNotificationDTO);

    // Execute the use case with provided parameters
    const result = await fetchRecentNotifications.execute(userId);

    // Verify that the service was called with the expected arguments
    expect(mockNotificationService.fetchRecentNotifications).toHaveBeenCalledWith(userId);

    // Verify that the transformation to DTO was called with the service result
    expect(toNotificationDTO).toHaveBeenCalledWith(mockNotificationDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockNotificationDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchRecentNotifications execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockNotificationService.fetchRecentNotifications.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(fetchRecentNotifications.execute(userId)).rejects.toThrow('Service method error');
  });
});
