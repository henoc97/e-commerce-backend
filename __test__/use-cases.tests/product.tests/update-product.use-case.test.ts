import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/application/services/product.service';
import { UpdateProduct } from '../../../src/application/use-cases/product.use-cases/update-product.use-case';
import { ProductDTO } from '../../../src/presentation/dtos/product.dto';
import { toProductDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the UpdateProduct use case.
 * This test covers the initialization and behavior of the UpdateProduct class.
 * It mocks the ProductService service and verifies that the use case handles the business logic as expected.
 */
describe('UpdateProduct', () => {
  let updateProduct: UpdateProduct;
  let productService: ProductService;

  // Mock implementation of the ProductService service with jest functions
  const mockProductService = {
    updateProduct: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const productId: number = 1;
     const productDTO: Partial<ProductDTO> = { /* data */ };

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
        UpdateProduct,
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    updateProduct = module.get<UpdateProduct>(UpdateProduct);
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
    mockProductService.updateProduct.mockResolvedValue(mockProductDTO);
    (toProductDTO as jest.Mock).mockReturnValue(mockProductDTO);

    // Execute the use case with provided parameters
    const result = await updateProduct.execute(productId,
    productDTO,);

    // Verify that the service was called with the expected arguments
    expect(mockProductService.updateProduct).toHaveBeenCalledWith(productId,
    productDTO,);

    // Verify that the transformation to DTO was called with the service result
    expect(toProductDTO).toHaveBeenCalledWith(mockProductDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockProductDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when updateProduct execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockProductService.updateProduct.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(updateProduct.execute(productId,
    productDTO,)).rejects.toThrow('Service method error');
  });
});
