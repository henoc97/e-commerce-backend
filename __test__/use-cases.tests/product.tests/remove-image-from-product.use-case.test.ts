import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/application/services/product.service';
import { RemoveImageFromProduct } from '../../../src/application/use-cases/product.use-cases/remove-image-from-product.use-case';
import { ProductDTO } from '../../../src/presentation/dtos/product.dto';
import { toProductDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the RemoveImageFromProduct use case.
 * This test covers the initialization and behavior of the RemoveImageFromProduct class.
 * It mocks the ProductService service and verifies that the use case handles the business logic as expected.
 */
describe('RemoveImageFromProduct', () => {
  let removeImageFromProduct: RemoveImageFromProduct;
  let productService: ProductService;

  // Mock implementation of the ProductService service with jest functions
  const mockProductService = {
    removeImageFromProduct: jest.fn(),
  };

  // Define parameters for the use case to be used during testing

  const productId: number = 1;
  const imageId: number = 1;

  // Mock version of  to be used as input and expected output
  const mockProductDTO: ProductDTO = {
    // TODO: Fill in your ProductDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveImageFromProduct,
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    removeImageFromProduct = module.get<RemoveImageFromProduct>(
      RemoveImageFromProduct,
    );
    productService = module.get<ProductService>(ProductService);
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
    mockProductService.removeImageFromProduct.mockResolvedValue(mockProductDTO);
    (toProductDTO as jest.Mock).mockReturnValue(mockProductDTO);

    // Execute the use case with provided parameters
    const result = await removeImageFromProduct.execute(productId, imageId);

    // Verify that the service was called with the expected arguments
    expect(mockProductService.removeImageFromProduct).toHaveBeenCalledWith(
      productId,
      imageId,
    );

    // Verify that the transformation to DTO was called with the service result
    expect(toProductDTO).toHaveBeenCalledWith(mockProductDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockProductDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when removeImageFromProduct execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockProductService.removeImageFromProduct.mockRejectedValue(
      'Service method error',
    );

    // Verify that the use case throws an error when service method fails
    await expect(
      removeImageFromProduct.execute(productId, imageId),
    ).rejects.toThrow('Service method error');
  });
});
