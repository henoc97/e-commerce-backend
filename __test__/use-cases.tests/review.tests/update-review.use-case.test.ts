import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from '../../../src/application/services/review.service';
import { UpdateReview } from '../../../src/application/use-cases/review.use-cases/update-review.use-case';
import { ReviewDTO } from '../../../src/presentation/dtos/review.dto';
import { toReviewDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the UpdateReview use case.
 * This test covers the initialization and behavior of the UpdateReview class.
 * It mocks the ReviewService service and verifies that the use case handles the business logic as expected.
 */
describe('UpdateReview', () => {
  let updateReview: UpdateReview;
  let reviewService: ReviewService;

  // Mock implementation of the ReviewService service with jest functions
  const mockReviewService = {
    updateReview: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const id: number = 1;
     const reviewDTO: ReviewDTO = { /* data */ };

  // Mock version of  to be used as input and expected output
  const mockReviewDTO: ReviewDTO = {
    // TODO: Fill in your ReviewDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateReview,
        {
          provide: ReviewService,
          useValue: mockReviewService,
        },
      ],
    }).compile();

    updateReview = module.get<UpdateReview>(UpdateReview);
    reviewService = module.get<ReviewService>(ReviewService);
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
    mockReviewService.updateReview.mockResolvedValue(mockReviewDTO);
    (toReviewDTO as jest.Mock).mockReturnValue(mockReviewDTO);

    // Execute the use case with provided parameters
    const result = await updateReview.execute(id, reviewDTO);

    // Verify that the service was called with the expected arguments
    expect(mockReviewService.updateReview).toHaveBeenCalledWith(id, reviewDTO);

    // Verify that the transformation to DTO was called with the service result
    expect(toReviewDTO).toHaveBeenCalledWith(mockReviewDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockReviewDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when updateReview execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockReviewService.updateReview.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(updateReview.execute(id, reviewDTO)).rejects.toThrow('Service method error');
  });
});
