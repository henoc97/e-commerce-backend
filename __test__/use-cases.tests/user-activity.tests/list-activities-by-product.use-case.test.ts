import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityService } from '../../../src/application/services/user-activity.service';
import { ListActivitiesByProduct } from '../../../src/application/use-cases/user-activity.use-cases/list-activities-by-product.use-case';
import { UserActivityDTO } from '../../../src/presentation/dtos/user-activity.dto';
import { toUserActivityDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the ListActivitiesByProduct use case.
 * This test covers the initialization and behavior of the ListActivitiesByProduct class.
 * It mocks the UserActivityService service and verifies that the use case handles the business logic as expected.
 */
describe('ListActivitiesByProduct', () => {
  let listActivitiesByProduct: ListActivitiesByProduct;
  let userActivityService: UserActivityService;

  // Mock implementation of the UserActivityService service with jest functions
  const mockUserActivityService = {
    listActivitiesByProduct: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const productId: number = 1;

  // Mock version of  to be used as input and expected output
  const mockUserActivityDTO: UserActivityDTO = {
    // TODO: Fill in your UserActivityDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListActivitiesByProduct,
        {
          provide: UserActivityService,
          useValue: mockUserActivityService,
        },
      ],
    }).compile();

    listActivitiesByProduct = module.get<ListActivitiesByProduct>(ListActivitiesByProduct);
    userActivityService = module.get<UserActivityService>(UserActivityService);
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
    mockUserActivityService.listActivitiesByProduct.mockResolvedValue(mockUserActivityDTO);
    (toUserActivityDTO as jest.Mock).mockReturnValue(mockUserActivityDTO);

    // Execute the use case with provided parameters
    const result = await listActivitiesByProduct.execute(productId);

    // Verify that the service was called with the expected arguments
    expect(mockUserActivityService.listActivitiesByProduct).toHaveBeenCalledWith(productId);

    // Verify that the transformation to DTO was called with the service result
    expect(toUserActivityDTO).toHaveBeenCalledWith(mockUserActivityDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockUserActivityDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when listActivitiesByProduct execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockUserActivityService.listActivitiesByProduct.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(listActivitiesByProduct.execute(productId)).rejects.toThrow('Service method error');
  });
});
