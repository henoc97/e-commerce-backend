import { Test, TestingModule } from '@nestjs/testing';
import { PromotionService } from '../../../src/application/services/promotion.service';
import { UpdatePromotion } from '../../../src/application/use-cases/promotion.use-cases/update-promotion.use-case';
import { PromotionDTO } from '../../../src/presentation/dtos/promotion.dto';
import { toPromotionDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the UpdatePromotion use case.
 * This test covers the initialization and behavior of the UpdatePromotion class.
 * It mocks the PromotionService service and verifies that the use case handles the business logic as expected.
 */
describe('UpdatePromotion', () => {
  let updatePromotion: UpdatePromotion;
  let promotionService: PromotionService;

  // Mock implementation of the PromotionService service with jest functions
  const mockPromotionService = {
    updatePromotion: jest.fn(),
  };

  // Define parameters for the use case to be used during testing

  const promotionId: number = 1;
  const promotionDTO: PromotionDTO = {
    /* data */
  };

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
        UpdatePromotion,
        {
          provide: PromotionService,
          useValue: mockPromotionService,
        },
      ],
    }).compile();

    updatePromotion = module.get<UpdatePromotion>(UpdatePromotion);
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
    mockPromotionService.updatePromotion.mockResolvedValue(mockPromotionDTO);
    (toPromotionDTO as jest.Mock).mockReturnValue(mockPromotionDTO);

    // Execute the use case with provided parameters
    const result = await updatePromotion.execute(promotionId, promotionDTO);

    // Verify that the service was called with the expected arguments
    expect(mockPromotionService.updatePromotion).toHaveBeenCalledWith(
      promotionId,
      promotionDTO,
    );

    // Verify that the transformation to DTO was called with the service result
    expect(toPromotionDTO).toHaveBeenCalledWith(mockPromotionDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockPromotionDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when updatePromotion execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockPromotionService.updatePromotion.mockRejectedValue(
      'Service method error',
    );

    // Verify that the use case throws an error when service method fails
    await expect(
      updatePromotion.execute(promotionId, promotionDTO),
    ).rejects.toThrow('Service method error');
  });
});
