import { Test, TestingModule } from '@nestjs/testing';
import { ProductImageService } from '../../../src/application/services/product-image.service';
import { UpdateProductImageUrl } from '../../../src/application/use-cases/product-image.use-cases/update-product-image-url.use-case';
import { ProductImageDTO } from '../../../src/presentation/dtos/product-image.dto';
import { toProductImageDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the UpdateProductImageUrl use case.
 * This test covers the initialization and behavior of the UpdateProductImageUrl class.
 * It mocks the ProductImageService service and verifies that the use case handles the business logic as expected.
 */
describe('UpdateProductImageUrl', () => {
  let updateProductImageUrl: UpdateProductImageUrl;
  let productImageService: ProductImageService;

  // Mock implementation of the ProductImageService service with jest functions
  const mockProductImageService = {
    updateProductImageUrl: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const id: number = 1;
     const url: string = 'url';

  // Mock version of  to be used as input and expected output
  const mockProductImageDTO: ProductImageDTO = {
    // TODO: Fill in your ProductImageDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductImageUrl,
        {
          provide: ProductImageService,
          useValue: mockProductImageService,
        },
      ],
    }).compile();

    updateProductImageUrl = module.get<UpdateProductImageUrl>(UpdateProductImageUrl);
    productImageService = module.get<ProductImageService>(ProductImageService);
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
    mockProductImageService.updateProductImageUrl.mockResolvedValue(mockProductImageDTO);
    (toProductImageDTO as jest.Mock).mockReturnValue(mockProductImageDTO);

    // Execute the use case with provided parameters
    const result = await updateProductImageUrl.execute(id, url);

    // Verify that the service was called with the expected arguments
    expect(mockProductImageService.updateProductImageUrl).toHaveBeenCalledWith(id, url);

    // Verify that the transformation to DTO was called with the service result
    expect(toProductImageDTO).toHaveBeenCalledWith(mockProductImageDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockProductImageDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when updateProductImageUrl execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockProductImageService.updateProductImageUrl.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(updateProductImageUrl.execute(id, url)).rejects.toThrow('Service method error');
  });
});
