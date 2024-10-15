import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterSubscriptionService } from '../../../src/application/services/newsletter-subscription.service';
import { FetchNewsletterSubscriptionById } from '../../../src/application/use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscription-by-id.use-case';
import { NewsletterSubscriptionDTO } from '../../../src/presentation/dtos/newsletter-subscription.dto';
import { toNewsletterSubscriptionDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchNewsletterSubscriptionById use case.
 * This test covers the initialization and behavior of the FetchNewsletterSubscriptionById class.
 * It mocks the NewsletterSubscriptionService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchNewsletterSubscriptionById', () => {
  let fetchNewsletterSubscriptionById: FetchNewsletterSubscriptionById;
  let newsletterSubscriptionService: NewsletterSubscriptionService;

  // Mock implementation of the NewsletterSubscriptionService service with jest functions
  const mockNewsletterSubscriptionService = {
    fetchNewsletterSubscriptionById: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const id: number = 1;

  // Mock version of  to be used as input and expected output
  const mockNewsletterSubscriptionDTO: NewsletterSubscriptionDTO = {
    // TODO: Fill in your NewsletterSubscriptionDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchNewsletterSubscriptionById,
        {
          provide: NewsletterSubscriptionService,
          useValue: mockNewsletterSubscriptionService,
        },
      ],
    }).compile();

    fetchNewsletterSubscriptionById = module.get<FetchNewsletterSubscriptionById>(FetchNewsletterSubscriptionById);
    newsletterSubscriptionService = module.get<NewsletterSubscriptionService>(NewsletterSubscriptionService);
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
    mockNewsletterSubscriptionService.fetchNewsletterSubscriptionById.mockResolvedValue(mockNewsletterSubscriptionDTO);
    (toNewsletterSubscriptionDTO as jest.Mock).mockReturnValue(mockNewsletterSubscriptionDTO);

    // Execute the use case with provided parameters
    const result = await fetchNewsletterSubscriptionById.execute(id);

    // Verify that the service was called with the expected arguments
    expect(mockNewsletterSubscriptionService.fetchNewsletterSubscriptionById).toHaveBeenCalledWith(id);

    // Verify that the transformation to DTO was called with the service result
    expect(toNewsletterSubscriptionDTO).toHaveBeenCalledWith(mockNewsletterSubscriptionDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockNewsletterSubscriptionDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchNewsletterSubscriptionById execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockNewsletterSubscriptionService.fetchNewsletterSubscriptionById.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(fetchNewsletterSubscriptionById.execute(id)).rejects.toThrow('Service method error');
  });
});
