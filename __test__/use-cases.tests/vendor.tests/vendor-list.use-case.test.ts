import { Test, TestingModule } from '@nestjs/testing';
import { VendorService } from '../../../src/application/services/vendor.service';
import { VendorList } from '../../../src/application/use-cases/vendor.use-cases/vendor-list.use-case';
import { VendorDTO } from '../../../src/presentation/dtos/vendor.dto';
import { toVendorDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the VendorList use case.
 * This test covers the initialization and behavior of the VendorList class.
 * It mocks the VendorService service and verifies that the use case handles the business logic as expected.
 */
describe('VendorList', () => {
  let vendorList: VendorList;
  let vendorService: VendorService;

  // Mock implementation of the VendorService service with jest functions
  const mockVendorService = {
    vendorList: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  

  // Mock version of  to be used as input and expected output
  const mockVendorDTO: VendorDTO = {
    // TODO: Fill in your VendorDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorList,
        {
          provide: VendorService,
          useValue: mockVendorService,
        },
      ],
    }).compile();

    vendorList = module.get<VendorList>(VendorList);
    vendorService = module.get<VendorService>(VendorService);
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
    mockVendorService.vendorList.mockResolvedValue(mockVendorDTO);
    (toVendorDTO as jest.Mock).mockReturnValue(mockVendorDTO);

    // Execute the use case with provided parameters
    const result = await vendorList.execute();

    // Verify that the service was called with the expected arguments
    expect(mockVendorService.vendorList).toHaveBeenCalledWith();

    // Verify that the transformation to DTO was called with the service result
    expect(toVendorDTO).toHaveBeenCalledWith(mockVendorDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockVendorDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when vendorList execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockVendorService.vendorList.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(vendorList.execute()).rejects.toThrow('Service method error');
  });
});
