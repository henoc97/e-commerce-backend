import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../../../src/application/services/notification.service';
import { DeleteNotification } from '../../../src/application/use-cases/notification.use-cases/delete-notification.use-case';
import { NotificationDTO } from '../../../src/presentation/dtos/notification.dto';
import { toNotificationDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the DeleteNotification use case.
 * This test covers the initialization and behavior of the DeleteNotification class.
 * It mocks the NotificationService service and verifies that the use case handles the business logic as expected.
 */
describe('DeleteNotification', () => {
  let deleteNotification: DeleteNotification;
  let notificationService: NotificationService;

  // Mock implementation of the NotificationService service with jest functions
  const mockNotificationService = {
    deleteNotification: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const notificationId: number = 1;

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
        DeleteNotification,
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    deleteNotification = module.get<DeleteNotification>(DeleteNotification);
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
    mockNotificationService.deleteNotification.mockResolvedValue(mockNotificationDTO);
    (toNotificationDTO as jest.Mock).mockReturnValue(mockNotificationDTO);

    // Execute the use case with provided parameters
    const result = await deleteNotification.execute(notificationId);

    // Verify that the service was called with the expected arguments
    expect(mockNotificationService.deleteNotification).toHaveBeenCalledWith(notificationId);

    // Verify that the transformation to DTO was called with the service result
    expect(toNotificationDTO).toHaveBeenCalledWith(mockNotificationDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockNotificationDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when deleteNotification execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockNotificationService.deleteNotification.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(deleteNotification.execute(notificationId)).rejects.toThrow('Service method error');
  });
});
