import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from '../../../src/application/services/subscription.service';
import { CountSubscriptionsByVendor } from '../../../src/application/use-cases/subscription.use-cases/count-subscriptions-by-vendor.use-case';
import { SubscriptionDTO } from '../../../src/presentation/dtos/subscription.dto';
import { toSubscriptionDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the CountSubscriptionsByVendor use case.
 * This test covers the initialization and behavior of the CountSubscriptionsByVendor class.
 * It mocks the SubscriptionService service and verifies that the use case handles the business logic as expected.
 */
describe('CountSubscriptionsByVendor', () => {
  let countSubscriptionsByVendor: CountSubscriptionsByVendor;
  let subscriptionService: SubscriptionService;

  // Mock implementation of the SubscriptionService service with jest functions
  const mockSubscriptionService = {
    countSubscriptionsByVendor: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const vendorId: number = 1;

  // Mock version of  to be used as input and expected output
  const mockSubscriptionDTO: SubscriptionDTO = {
    // TODO: Fill in your SubscriptionDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountSubscriptionsByVendor,
        {
          provide: SubscriptionService,
          useValue: mockSubscriptionService,
        },
      ],
    }).compile();

    countSubscriptionsByVendor = module.get<CountSubscriptionsByVendor>(CountSubscriptionsByVendor);
    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
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
    mockSubscriptionService.countSubscriptionsByVendor.mockResolvedValue(mockSubscriptionDTO);
    (toSubscriptionDTO as jest.Mock).mockReturnValue(mockSubscriptionDTO);

    // Execute the use case with provided parameters
    const result = await countSubscriptionsByVendor.execute(vendorId);

    // Verify that the service was called with the expected arguments
    expect(mockSubscriptionService.countSubscriptionsByVendor).toHaveBeenCalledWith(vendorId);

    // Verify that the transformation to DTO was called with the service result
    expect(toSubscriptionDTO).toHaveBeenCalledWith(mockSubscriptionDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockSubscriptionDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when countSubscriptionsByVendor execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockSubscriptionService.countSubscriptionsByVendor.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(countSubscriptionsByVendor.execute(vendorId)).rejects.toThrow('Service method error');
  });
});
