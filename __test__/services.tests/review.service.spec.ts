import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from '../../src/application/services/review.service';
import { IReviewRepository } from '../../src/domain/repositories/review.repository';
import { Review } from '../../src/domain/entities/review.entity';
import { ReviewDTO } from '../../src/presentation/dtos/review.dto';

const mockReviewRepository = {
  createReview: jest.fn(),
  getReviewById: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
  getReviewsByProduct: jest.fn(),
  getReviewsByUser: jest.fn(),
  getReviewsByRating: jest.fn(),
  getReviewsByDateRange: jest.fn(),
  verifyReview: jest.fn(),
  flagReview: jest.fn(),
  getFlaggedReviews: jest.fn(),
  getPopularReviews: jest.fn(),
  getAverageRating: jest.fn(),
};

describe('ReviewService', () => {
  let service: ReviewService;
  let reviewRepository: IReviewRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: 'ReviewRepository',
          useValue: mockReviewRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<IReviewRepository>('ReviewRepository');
  });

  /* create review success and failure tests */
  it('should create review', async () => {
    /**
     * Tests the create review method.
     * Verifies that the returned review matches the expected one
     * and that the repository's createReview method is called with the correct data.
     */

    const reviewDTO: ReviewDTO = {
      /* data */
    };

    const returnOject: Review = { id: 1 /* others data */ };

    mockReviewRepository.createReview.mockResolvedValue(returnOject);

    const result = await service.createReview(reviewDTO);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.createReview).toHaveBeenCalledWith(reviewDTO);
  });

  it('should throw an error when create review method fails', async () => {
    const reviewDTO: ReviewDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockReviewRepository.createReview.mockResolvedValue(' Repository error');

    const result = await service.createReview(reviewDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get review by id success and failure tests */
  it('should get review by id', async () => {
    /**
     * Tests the get review by id method.
     * Verifies that the returned review matches the expected one
     * and that the repository's getReviewById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Review | null = { id: 1 /* others data */ };

    mockReviewRepository.getReviewById.mockResolvedValue(returnOject);

    const result = await service.getReviewById(id);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getReviewById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get review by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockReviewRepository.getReviewById.mockResolvedValue(' Repository error');

    const result = await service.getReviewById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update review success and failure tests */
  it('should update review', async () => {
    /**
     * Tests the update review method.
     * Verifies that the returned review matches the expected one
     * and that the repository's updateReview method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<ReviewDTO> = {
      /* data */
    };

    const returnOject: Review = { id: 1 /* others data */ };

    mockReviewRepository.updateReview.mockResolvedValue(returnOject);

    const result = await service.updateReview(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.updateReview).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update review method fails', async () => {
    const id: number = 1;
    const updates: Partial<ReviewDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockReviewRepository.updateReview.mockResolvedValue(' Repository error');

    const result = await service.updateReview(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete review success and failure tests */
  it('should delete review', async () => {
    /**
     * Tests the delete review method.
     * Verifies that the returned review matches the expected one
     * and that the repository's deleteReview method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockReviewRepository.deleteReview.mockResolvedValue(returnOject);

    const result = await service.deleteReview(id);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.deleteReview).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete review method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockReviewRepository.deleteReview.mockResolvedValue(' Repository error');

    const result = await service.deleteReview(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get reviews by product success and failure tests */
  it('should get reviews by product', async () => {
    /**
     * Tests the get reviews by product method.
     * Verifies that the returned review matches the expected one
     * and that the repository's getReviewsByProduct method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: Review[] = [{ id: 1 /* others data */ }];

    mockReviewRepository.getReviewsByProduct.mockResolvedValue(returnOject);

    const result = await service.getReviewsByProduct(productId);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getReviewsByProduct).toHaveBeenCalledWith(
      productId,
    );
  });

  it('should throw an error when get reviews by product method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockReviewRepository.getReviewsByProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getReviewsByProduct(productId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get reviews by user success and failure tests */
  it('should get reviews by user', async () => {
    /**
     * Tests the get reviews by user method.
     * Verifies that the returned review matches the expected one
     * and that the repository's getReviewsByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Review[] = [{ id: 1 /* others data */ }];

    mockReviewRepository.getReviewsByUser.mockResolvedValue(returnOject);

    const result = await service.getReviewsByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getReviewsByUser).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get reviews by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockReviewRepository.getReviewsByUser.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getReviewsByUser(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get reviews by rating success and failure tests */
  it('should get reviews by rating', async () => {
    /**
     * Tests the get reviews by rating method.
     * Verifies that the returned review matches the expected one
     * and that the repository's getReviewsByRating method is called with the correct data.
     */

    const rating: number = 1;

    const returnOject: Review[] = [{ id: 1 /* others data */ }];

    mockReviewRepository.getReviewsByRating.mockResolvedValue(returnOject);

    const result = await service.getReviewsByRating(rating);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getReviewsByRating).toHaveBeenCalledWith(
      rating,
    );
  });

  it('should throw an error when get reviews by rating method fails', async () => {
    const rating: number = 1;

    // Simulate a failure when calling the repository
    mockReviewRepository.getReviewsByRating.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getReviewsByRating(rating);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get reviews by date range success and failure tests */
  it('should get reviews by date range', async () => {
    /**
     * Tests the get reviews by date range method.
     * Verifies that the returned review matches the expected one
     * and that the repository's getReviewsByDateRange method is called with the correct data.
     */

    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    const returnOject: Review[] = [{ id: 1 /* others data */ }];

    mockReviewRepository.getReviewsByDateRange.mockResolvedValue(returnOject);

    const result = await service.getReviewsByDateRange(startDate, endDate);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getReviewsByDateRange).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });

  it('should throw an error when get reviews by date range method fails', async () => {
    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockReviewRepository.getReviewsByDateRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getReviewsByDateRange(startDate, endDate);
    expect(result).rejects.toThrow('Repository error');
  });

  /* verify review success and failure tests */
  it('should verify review', async () => {
    /**
     * Tests the verify review method.
     * Verifies that the returned review matches the expected one
     * and that the repository's verifyReview method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Review = { id: 1 /* others data */ };

    mockReviewRepository.verifyReview.mockResolvedValue(returnOject);

    const result = await service.verifyReview(id);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.verifyReview).toHaveBeenCalledWith(id);
  });

  it('should throw an error when verify review method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockReviewRepository.verifyReview.mockResolvedValue(' Repository error');

    const result = await service.verifyReview(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* flag review success and failure tests */
  it('should flag review', async () => {
    /**
     * Tests the flag review method.
     * Verifies that the returned review matches the expected one
     * and that the repository's flagReview method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Review = { id: 1 /* others data */ };

    mockReviewRepository.flagReview.mockResolvedValue(returnOject);

    const result = await service.flagReview(id);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.flagReview).toHaveBeenCalledWith(id);
  });

  it('should throw an error when flag review method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockReviewRepository.flagReview.mockResolvedValue(' Repository error');

    const result = await service.flagReview(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get flagged reviews success and failure tests */
  it('should get flagged reviews', async () => {
    /**
     * Tests the get flagged reviews method.
     * Verifies that the returned review matches the expected one
     * and that the repository's getFlaggedReviews method is called with the correct data.
     */

    const returnOject: Review[] = [{ id: 1 /* others data */ }];

    mockReviewRepository.getFlaggedReviews.mockResolvedValue(returnOject);

    const result = await service.getFlaggedReviews();
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getFlaggedReviews).toHaveBeenCalledWith();
  });

  it('should throw an error when get flagged reviews method fails', async () => {
    // Simulate a failure when calling the repository
    mockReviewRepository.getFlaggedReviews.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getFlaggedReviews();
    expect(result).rejects.toThrow('Repository error');
  });

  /* get popular reviews success and failure tests */
  it('should get popular reviews', async () => {
    /**
     * Tests the get popular reviews method.
     * Verifies that the returned review matches the expected one
     * and that the repository's getPopularReviews method is called with the correct data.
     */

    const limit: number = 1;

    const returnOject: Review[] = [{ id: 1 /* others data */ }];

    mockReviewRepository.getPopularReviews.mockResolvedValue(returnOject);

    const result = await service.getPopularReviews(limit);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getPopularReviews).toHaveBeenCalledWith(limit);
  });

  it('should throw an error when get popular reviews method fails', async () => {
    const limit: number = 1;

    // Simulate a failure when calling the repository
    mockReviewRepository.getPopularReviews.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getPopularReviews(limit);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get average rating success and failure tests */
  it('should get average rating', async () => {
    /**
     * Tests the get average rating method.
     * Verifies that the returned review matches the expected one
     * and that the repository's getAverageRating method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: number = 1;

    mockReviewRepository.getAverageRating.mockResolvedValue(returnOject);

    const result = await service.getAverageRating(productId);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getAverageRating).toHaveBeenCalledWith(
      productId,
    );
  });

  it('should throw an error when get average rating method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockReviewRepository.getAverageRating.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getAverageRating(productId);
    expect(result).rejects.toThrow('Repository error');
  });
});
