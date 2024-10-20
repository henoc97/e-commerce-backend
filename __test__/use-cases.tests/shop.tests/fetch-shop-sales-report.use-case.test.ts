import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from '../../../src/application/services/shop.service';
import { FetchShopSalesReport } from '../../../src/application/use-cases/shop.use-cases/fetch-shop-sales-report.use-case';
import { ShopDTO } from '../../../src/presentation/dtos/shop.dto';
import { toShopDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchShopSalesReport use case.
 * This test covers the initialization and behavior of the FetchShopSalesReport class.
 * It mocks the ShopService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchShopSalesReport', () => {
  let fetchShopSalesReport: FetchShopSalesReport;
  let shopService: ShopService;

  // Mock implementation of the ShopService service with jest functions
  const mockShopService = {
    fetchShopSalesReport: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const shopId: number = 1;
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };

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
        FetchShopSalesReport,
        {
          provide: ShopService,
          useValue: mockShopService,
        },
      ],
    }).compile();

    fetchShopSalesReport = module.get<FetchShopSalesReport>(FetchShopSalesReport);
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
    mockShopService.fetchShopSalesReport.mockResolvedValue(mockShopDTO);
    (toShopDTO as jest.Mock).mockReturnValue(mockShopDTO);

    // Execute the use case with provided parameters
    const result = await fetchShopSalesReport.execute(shopId, startDate, endDate);

    // Verify that the service was called with the expected arguments
    expect(mockShopService.fetchShopSalesReport).toHaveBeenCalledWith(shopId, startDate, endDate);

    // Verify that the transformation to DTO was called with the service result
    expect(toShopDTO).toHaveBeenCalledWith(mockShopDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockShopDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchShopSalesReport execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockShopService.fetchShopSalesReport.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(fetchShopSalesReport.execute(shopId, startDate, endDate)).rejects.toThrow('Service method error');
  });
});
