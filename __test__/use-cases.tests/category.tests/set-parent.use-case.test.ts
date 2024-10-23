import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../../src/application/services/category.service';
import { SetParent } from '../../../src/application/use-cases/category.use-cases/set-parent.use-case';
import { CategoryDTO } from '../../../src/presentation/dtos/category.dto';
import { toCategoryDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the SetParent use case.
 * This test covers the initialization and behavior of the SetParent class.
 * It mocks the CategoryService service and verifies that the use case handles the business logic as expected.
 */
describe('SetParent', () => {
  let setParent: SetParent;
  let categoryService: CategoryService;

  // Mock implementation of the CategoryService service with jest functions
  const mockCategoryService = {
    setParent: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const id: number = 1;
     const newParentId: number = 1;

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
        SetParent,
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    setParent = module.get<SetParent>(SetParent);
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
    mockCategoryService.setParent.mockResolvedValue(mockCategoryDTO);
    (toCategoryDTO as jest.Mock).mockReturnValue(mockCategoryDTO);

    // Execute the use case with provided parameters
    const result = await setParent.execute(id, newParentId);

    // Verify that the service was called with the expected arguments
    expect(mockCategoryService.setParent).toHaveBeenCalledWith(id, newParentId);

    // Verify that the transformation to DTO was called with the service result
    expect(toCategoryDTO).toHaveBeenCalledWith(mockCategoryDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockCategoryDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when setParent execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockCategoryService.setParent.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(setParent.execute(id, newParentId)).rejects.toThrow('Service method error');
  });
});
