import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterSubscriptionService } from '../../../src/application/services/newsletter-subscription.service';
import { FetchNewsletterSubscriptionByEmail } from '../../../src/application/use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscription-by-email.use-case';
import { NewsletterSubscriptionDTO } from '../../../src/presentation/dtos/newsletter-subscription.dto';
import { toNewsletterSubscriptionDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchNewsletterSubscriptionByEmail use case.
 * This test covers the initialization and behavior of the FetchNewsletterSubscriptionByEmail class.
 * It mocks the NewsletterSubscriptionService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchNewsletterSubscriptionByEmail', () => {
  let fetchNewsletterSubscriptionByEmail: FetchNewsletterSubscriptionByEmail;
  let newsletterSubscriptionService: NewsletterSubscriptionService;

  // Mock implementation of the NewsletterSubscriptionService service with jest functions
  const mockNewsletterSubscriptionService = {
    fetchNewsletterSubscriptionByEmail: jest.fn(),
  };

  // Define parameters for the use case to be used during testing

  const email: string = 'email';

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
        FetchNewsletterSubscriptionByEmail,
        {
          provide: NewsletterSubscriptionService,
          useValue: mockNewsletterSubscriptionService,
        },
      ],
    }).compile();

    fetchNewsletterSubscriptionByEmail =
      module.get<FetchNewsletterSubscriptionByEmail>(
        FetchNewsletterSubscriptionByEmail,
      );
    newsletterSubscriptionService = module.get<NewsletterSubscriptionService>(
      NewsletterSubscriptionService,
    );
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
    mockNewsletterSubscriptionService.fetchNewsletterSubscriptionByEmail.mockResolvedValue(
      mockNewsletterSubscriptionDTO,
    );
    (toNewsletterSubscriptionDTO as jest.Mock).mockReturnValue(
      mockNewsletterSubscriptionDTO,
    );

    // Execute the use case with provided parameters
    const result = await fetchNewsletterSubscriptionByEmail.execute(email);

    // Verify that the service was called with the expected arguments
    expect(
      mockNewsletterSubscriptionService.fetchNewsletterSubscriptionByEmail,
    ).toHaveBeenCalledWith(email);

    // Verify that the transformation to DTO was called with the service result
    expect(toNewsletterSubscriptionDTO).toHaveBeenCalledWith(
      mockNewsletterSubscriptionDTO,
    );

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockNewsletterSubscriptionDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchNewsletterSubscriptionByEmail execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockNewsletterSubscriptionService.fetchNewsletterSubscriptionByEmail.mockRejectedValue(
      'Service method error',
    );

    // Verify that the use case throws an error when service method fails
    await expect(
      fetchNewsletterSubscriptionByEmail.execute(email),
    ).rejects.toThrow('Service method error');
  });
});
