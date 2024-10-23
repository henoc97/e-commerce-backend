import { Test, TestingModule } from '@nestjs/testing';
import { PromotionService } from '../../../src/application/services/promotion.service';
import { ApplyPromotionToProduct } from '../../../src/application/use-cases/promotion.use-cases/apply-promotion-to-product.use-case';
import { PromotionDTO } from '../../../src/presentation/dtos/promotion.dto';
import { toPromotionDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the ApplyPromotionToProduct use case.
 * This test covers the initialization and behavior of the ApplyPromotionToProduct class.
 * It mocks the PromotionService service and verifies that the use case handles the business logic as expected.
 */
describe('ApplyPromotionToProduct', () => {
  let applyPromotionToProduct: ApplyPromotionToProduct;
  let promotionService: PromotionService;

  // Mock implementation of the PromotionService service with jest functions
  const mockPromotionService = {
    applyPromotionToProduct: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const productId: number = 1;
     const promotionId: number = 1;

  // Mock version of  to be used as input and expected output
  const mockPromotionDTO: PromotionDTO = {
    // TODO: Fill in your PromotionDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplyPromotionToProduct,
        {
          provide: PromotionService,
          useValue: mockPromotionService,
        },
      ],
    }).compile();

    applyPromotionToProduct = module.get<ApplyPromotionToProduct>(ApplyPromotionToProduct);
    promotionService = module.get<PromotionService>(PromotionService);
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
    mockPromotionService.applyPromotionToProduct.mockResolvedValue(mockPromotionDTO);
    (toPromotionDTO as jest.Mock).mockReturnValue(mockPromotionDTO);

    // Execute the use case with provided parameters
    const result = await applyPromotionToProduct.execute(productId, promotionId);

    // Verify that the service was called with the expected arguments
    expect(mockPromotionService.applyPromotionToProduct).toHaveBeenCalledWith(productId, promotionId);

    // Verify that the transformation to DTO was called with the service result
    expect(toPromotionDTO).toHaveBeenCalledWith(mockPromotionDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockPromotionDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when applyPromotionToProduct execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockPromotionService.applyPromotionToProduct.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(applyPromotionToProduct.execute(productId, promotionId)).rejects.toThrow('Service method error');
  });
});
