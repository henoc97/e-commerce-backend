import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceService } from '../../../src/application/services/marketplace.service';
import { AddShopToMarketplace } from '../../../src/application/use-cases/marketplace.use-cases/add-shop-to-marketplace.use-case';
import { MarketplaceDTO } from '../../../src/presentation/dtos/marketplace.dto';
import { toMarketplaceDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the AddShopToMarketplace use case.
 * This test covers the initialization and behavior of the AddShopToMarketplace class.
 * It mocks the MarketplaceService service and verifies that the use case handles the business logic as expected.
 */
describe('AddShopToMarketplace', () => {
  let addShopToMarketplace: AddShopToMarketplace;
  let marketplaceService: MarketplaceService;

  // Mock implementation of the MarketplaceService service with jest functions
  const mockMarketplaceService = {
    addShopToMarketplace: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const marketplaceId: number = 1;
     const shopDTO: ShopDTO = { /* data */ };

  // Mock version of  to be used as input and expected output
  const mockMarketplaceDTO: MarketplaceDTO = {
    // TODO: Fill in your MarketplaceDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddShopToMarketplace,
        {
          provide: MarketplaceService,
          useValue: mockMarketplaceService,
        },
      ],
    }).compile();

    addShopToMarketplace = module.get<AddShopToMarketplace>(AddShopToMarketplace);
    marketplaceService = module.get<MarketplaceService>(MarketplaceService);
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
    mockMarketplaceService.addShopToMarketplace.mockResolvedValue(mockMarketplaceDTO);
    (toMarketplaceDTO as jest.Mock).mockReturnValue(mockMarketplaceDTO);

    // Execute the use case with provided parameters
    const result = await addShopToMarketplace.execute(marketplaceId,
    shopDTO,);

    // Verify that the service was called with the expected arguments
    expect(mockMarketplaceService.addShopToMarketplace).toHaveBeenCalledWith(marketplaceId,
    shopDTO,);

    // Verify that the transformation to DTO was called with the service result
    expect(toMarketplaceDTO).toHaveBeenCalledWith(mockMarketplaceDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockMarketplaceDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when addShopToMarketplace execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockMarketplaceService.addShopToMarketplace.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(addShopToMarketplace.execute(marketplaceId,
    shopDTO,)).rejects.toThrow('Service method error');
  });
});