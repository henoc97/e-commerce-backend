import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from '../../../src/application/services/shop.service';
import { AddCategoryToShop } from '../../../src/application/use-cases/shop.use-cases/add-category-to-shop.use-case';
import { ShopDTO } from '../../../src/presentation/dtos/shop.dto';
import { toShopDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the AddCategoryToShop use case.
 * This test covers the initialization and behavior of the AddCategoryToShop class.
 * It mocks the ShopService service and verifies that the use case handles the business logic as expected.
 */
describe('AddCategoryToShop', () => {
  let addCategoryToShop: AddCategoryToShop;
  let shopService: ShopService;

  // Mock implementation of the ShopService service with jest functions
  const mockShopService = {
    addCategoryToShop: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const shopId: number = 1;
     const categoryDTO: CategoryDTO = { /* data */ };

  // Mock version of  to be used as input and expected output
  const mockShopDTO: ShopDTO = {
    // TODO: Fill in your ShopDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddCategoryToShop,
        {
          provide: ShopService,
          useValue: mockShopService,
        },
      ],
    }).compile();

    addCategoryToShop = module.get<AddCategoryToShop>(AddCategoryToShop);
    shopService = module.get<ShopService>(ShopService);
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
    mockShopService.addCategoryToShop.mockResolvedValue(mockShopDTO);
    (toShopDTO as jest.Mock).mockReturnValue(mockShopDTO);

    // Execute the use case with provided parameters
    const result = await addCategoryToShop.execute(shopId,
    categoryDTO,);

    // Verify that the service was called with the expected arguments
    expect(mockShopService.addCategoryToShop).toHaveBeenCalledWith(shopId,
    categoryDTO,);

    // Verify that the transformation to DTO was called with the service result
    expect(toShopDTO).toHaveBeenCalledWith(mockShopDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockShopDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when addCategoryToShop execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockShopService.addCategoryToShop.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(addCategoryToShop.execute(shopId,
    categoryDTO,)).rejects.toThrow('Service method error');
  });
});
