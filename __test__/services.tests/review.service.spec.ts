import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from '../../src/application/services/review.service';
import { IReviewRepository } from '../../src/domain/repositories/review.repository';
import { Review } from '../../src/domain/entities/review.entity';
import { ReviewDTO } from '../../src/presentation/dtos/review.dto';


const mockReviewRepository = {
  create: jest.fn(),
getById: jest.fn(),
modify: jest.fn(),
remove: jest.fn(),
getByProduct: jest.fn(),
getByUser: jest.fn(),
getByRating: jest.fn(),
getByDateRange: jest.fn(),
verify: jest.fn(),
flag: jest.fn(),
getFlagged: jest.fn(),
getPopular: jest.fn(),
getAverageRating: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('ReviewService', () => {
    let service: ReviewService;
    let reviewRepository: IReviewRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: 'IReviewRepository',
          useValue: mockReviewRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<IReviewRepository>('IReviewRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create review success and failure tests */
it('should create review', async () => {
    /** 
     * Tests the create review method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's createReview method is called with the correct data.
     */
    
     const reviewDTO: ReviewDTO = { /* data */ };

    const returnOject: Review = { id: 1, /* others data */ };
    
    mockReviewRepository.create.mockResolvedValue(returnOject);

    const result = await service.createReview(reviewDTO);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.create).toHaveBeenCalledWith(reviewDTO);
});

it('should throw an error when create review method fails', async () => {
    
     const reviewDTO: ReviewDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createReview(reviewDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get review by id success and failure tests */
it('should get review by id', async () => {
    /** 
     * Tests the get review by id method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's getReviewById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Review | null = { id: 1, /* others data */ };
    
    mockReviewRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getReviewById(id);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get review by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getReviewById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update review success and failure tests */
it('should update review', async () => {
    /** 
     * Tests the update review method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's updateReview method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<ReviewDTO> = { /* data */ };

    const returnOject: Review = { id: 1, /* others data */ };
    
    mockReviewRepository.modify.mockResolvedValue(returnOject);

    const result = await service.updateReview(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.modify).toHaveBeenCalledWith(id, updates);
});

it('should throw an error when update review method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<ReviewDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.modify.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateReview(id, updates)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete review success and failure tests */
it('should delete review', async () => {
    /** 
     * Tests the delete review method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's deleteReview method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockReviewRepository.remove.mockResolvedValue(returnOject);

    const result = await service.deleteReview(id);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.remove).toHaveBeenCalledWith(id);
});

it('should throw an error when delete review method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.remove.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteReview(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get reviews by product success and failure tests */
it('should get reviews by product', async () => {
    /** 
     * Tests the get reviews by product method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's getReviewsByProduct method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: Review[] = [{ id: 1, /* others data */ }];
    
    mockReviewRepository.getByProduct.mockResolvedValue(returnOject);

    const result = await service.getReviewsByProduct(productId);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getByProduct).toHaveBeenCalledWith(productId);
});

it('should throw an error when get reviews by product method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.getByProduct.mockRejectedValue(new Error('Repository error'));

    await expect(service.getReviewsByProduct(productId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get reviews by user success and failure tests */
it('should get reviews by user', async () => {
    /** 
     * Tests the get reviews by user method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's getReviewsByUser method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Review[] = [{ id: 1, /* others data */ }];
    
    mockReviewRepository.getByUser.mockResolvedValue(returnOject);

    const result = await service.getReviewsByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getByUser).toHaveBeenCalledWith(userId);
});

it('should throw an error when get reviews by user method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.getByUser.mockRejectedValue(new Error('Repository error'));

    await expect(service.getReviewsByUser(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get reviews by rating success and failure tests */
it('should get reviews by rating', async () => {
    /** 
     * Tests the get reviews by rating method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's getReviewsByRating method is called with the correct data.
     */
    
     const rating: number = 1;

    const returnOject: Review[] = [{ id: 1, /* others data */ }];
    
    mockReviewRepository.getByRating.mockResolvedValue(returnOject);

    const result = await service.getReviewsByRating(rating);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getByRating).toHaveBeenCalledWith(rating);
});

it('should throw an error when get reviews by rating method fails', async () => {
    
     const rating: number = 1;
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.getByRating.mockRejectedValue(new Error('Repository error'));

    await expect(service.getReviewsByRating(rating)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get reviews by date range success and failure tests */
it('should get reviews by date range', async () => {
    /** 
     * Tests the get reviews by date range method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's getReviewsByDateRange method is called with the correct data.
     */
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };

    const returnOject: Review[] = [{ id: 1, /* others data */ }];
    
    mockReviewRepository.getByDateRange.mockResolvedValue(returnOject);

    const result = await service.getReviewsByDateRange(startDate,
    endDate,);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getByDateRange).toHaveBeenCalledWith(startDate,
    endDate,);
});

it('should throw an error when get reviews by date range method fails', async () => {
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.getByDateRange.mockRejectedValue(new Error('Repository error'));

    await expect(service.getReviewsByDateRange(startDate,
    endDate,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* verify review success and failure tests */
it('should verify review', async () => {
    /** 
     * Tests the verify review method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's verifyReview method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Review = { id: 1, /* others data */ };
    
    mockReviewRepository.verify.mockResolvedValue(returnOject);

    const result = await service.verifyReview(id);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.verify).toHaveBeenCalledWith(id);
});

it('should throw an error when verify review method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.verify.mockRejectedValue(new Error('Repository error'));

    await expect(service.verifyReview(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* flag review success and failure tests */
it('should flag review', async () => {
    /** 
     * Tests the flag review method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's flagReview method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Review = { id: 1, /* others data */ };
    
    mockReviewRepository.flag.mockResolvedValue(returnOject);

    const result = await service.flagReview(id);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.flag).toHaveBeenCalledWith(id);
});

it('should throw an error when flag review method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.flag.mockRejectedValue(new Error('Repository error'));

    await expect(service.flagReview(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get flagged reviews success and failure tests */
it('should get flagged reviews', async () => {
    /** 
     * Tests the get flagged reviews method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's getFlaggedReviews method is called with the correct data.
     */
    

    const returnOject: Review[] = [{ id: 1, /* others data */ }];
    
    mockReviewRepository.getFlagged.mockResolvedValue(returnOject);

    const result = await service.getFlaggedReviews();
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getFlagged).toHaveBeenCalledWith();
});

it('should throw an error when get flagged reviews method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.getFlagged.mockRejectedValue(new Error('Repository error'));

    await expect(service.getFlaggedReviews()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get popular reviews success and failure tests */
it('should get popular reviews', async () => {
    /** 
     * Tests the get popular reviews method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's getPopularReviews method is called with the correct data.
     */
    
     const limit: number = 1;

    const returnOject: Review[] = [{ id: 1, /* others data */ }];
    
    mockReviewRepository.getPopular.mockResolvedValue(returnOject);

    const result = await service.getPopularReviews(limit);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getPopular).toHaveBeenCalledWith(limit);
});

it('should throw an error when get popular reviews method fails', async () => {
    
     const limit: number = 1;
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.getPopular.mockRejectedValue(new Error('Repository error'));

    await expect(service.getPopularReviews(limit)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get average rating success and failure tests */
it('should get average rating', async () => {
    /** 
     * Tests the get average rating method.
     * Verifies that the returned review matches the expected one 
     * and that the repository's getAverageRating method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: number = 1
    
    mockReviewRepository.getAverageRating.mockResolvedValue(returnOject);

    const result = await service.getAverageRating(productId);
    expect(result).toEqual(returnOject);
    expect(mockReviewRepository.getAverageRating).toHaveBeenCalledWith(productId);
});

it('should throw an error when get average rating method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockReviewRepository.getAverageRating.mockRejectedValue(new Error('Repository error'));

    await expect(service.getAverageRating(productId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})
