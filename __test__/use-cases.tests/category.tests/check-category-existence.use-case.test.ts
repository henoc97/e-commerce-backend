import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../../src/application/services/category.service';
import { CheckCategoryExistence } from '../../../src/application/use-cases/category.use-cases/check-category-existence.use-case';
import { CategoryDTO } from '../../../src/presentation/dtos/category.dto';
import { toCategoryDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the CheckCategoryExistence use case.
 * This test covers the initialization and behavior of the CheckCategoryExistence class.
 * It mocks the CategoryService service and verifies that the use case handles the business logic as expected.
 */
describe('CheckCategoryExistence', () => {
  let checkCategoryExistence: CheckCategoryExistence;
  let categoryService: CategoryService;

  // Mock implementation of the CategoryService service with jest functions
  const mockCategoryService = {
    checkCategoryExistence: jest.fn(),
  };

  // Define parameters for the use case to be used during testing

  const name: string = 'name';
  const shopId: number = 1;

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
        CheckCategoryExistence,
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    checkCategoryExistence = module.get<CheckCategoryExistence>(
      CheckCategoryExistence,
    );
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
    mockCategoryService.checkCategoryExistence.mockResolvedValue(
      mockCategoryDTO,
    );
    (toCategoryDTO as jest.Mock).mockReturnValue(mockCategoryDTO);

    // Execute the use case with provided parameters
    const result = await checkCategoryExistence.execute(name, shopId);

    // Verify that the service was called with the expected arguments
    expect(mockCategoryService.checkCategoryExistence).toHaveBeenCalledWith(
      name,
      shopId,
    );

    // Verify that the transformation to DTO was called with the service result
    expect(toCategoryDTO).toHaveBeenCalledWith(mockCategoryDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockCategoryDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when checkCategoryExistence execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockCategoryService.checkCategoryExistence.mockRejectedValue(
      'Service method error',
    );

    // Verify that the use case throws an error when service method fails
    await expect(checkCategoryExistence.execute(name, shopId)).rejects.toThrow(
      'Service method error',
    );
  });
});
