import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../../src/application/services/category.service';
import { FetchCategoryById } from '../../../src/application/use-cases/category.use-cases/fetch-category-by-id.use-case';
import { CategoryDTO } from '../../../src/presentation/dtos/category.dto';
import { toCategoryDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchCategoryById use case.
 * This test covers the initialization and behavior of the FetchCategoryById class.
 * It mocks the CategoryService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchCategoryById', () => {
  let fetchCategoryById: FetchCategoryById;
  let categoryService: CategoryService;

  // Mock implementation of the CategoryService service with jest functions
  const mockCategoryService = {
    fetchCategoryById: jest.fn(),
  };

  // Define parameters for the use case to be used during testing

  const id: number = 1;

  // Mock version of  to be used as input and expected output
  const mockCategoryDTO: CategoryDTO = {
    // TODO: Fill in your CategoryDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchCategoryById,
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    fetchCategoryById = module.get<FetchCategoryById>(FetchCategoryById);
    categoryService = module.get<CategoryService>(CategoryService);
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
    mockCategoryService.fetchCategoryById.mockResolvedValue(mockCategoryDTO);
    (toCategoryDTO as jest.Mock).mockReturnValue(mockCategoryDTO);

    // Execute the use case with provided parameters
    const result = await fetchCategoryById.execute(id);

    // Verify that the service was called with the expected arguments
    expect(mockCategoryService.fetchCategoryById).toHaveBeenCalledWith(id);

    // Verify that the transformation to DTO was called with the service result
    expect(toCategoryDTO).toHaveBeenCalledWith(mockCategoryDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockCategoryDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchCategoryById execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockCategoryService.fetchCategoryById.mockRejectedValue(
      'Service method error',
    );

    // Verify that the use case throws an error when service method fails
    await expect(fetchCategoryById.execute(id)).rejects.toThrow(
      'Service method error',
    );
  });
});
