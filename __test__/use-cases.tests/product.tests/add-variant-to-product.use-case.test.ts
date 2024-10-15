import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/application/services/product.service';
import { AddVariantToProduct } from '../../../src/application/use-cases/product.use-cases/add-variant-to-product.use-case';
import { ProductDTO } from '../../../src/presentation/dtos/product.dto';
import { toProductDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the AddVariantToProduct use case.
 * This test covers the initialization and behavior of the AddVariantToProduct class.
 * It mocks the ProductService service and verifies that the use case handles the business logic as expected.
 */
describe('AddVariantToProduct', () => {
  let addVariantToProduct: AddVariantToProduct;
  let productService: ProductService;

  // Mock implementation of the ProductService service with jest functions
  const mockProductService = {
    addVariantToProduct: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const productId: number = 1;
     const variantDTO: ProductVariantDTO = { /* data */ };

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
        AddVariantToProduct,
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    addVariantToProduct = module.get<AddVariantToProduct>(AddVariantToProduct);
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
    mockProductService.addVariantToProduct.mockResolvedValue(mockProductDTO);
    (toProductDTO as jest.Mock).mockReturnValue(mockProductDTO);

    // Execute the use case with provided parameters
    const result = await addVariantToProduct.execute(productId,
    variantDTO,);

    // Verify that the service was called with the expected arguments
    expect(mockProductService.addVariantToProduct).toHaveBeenCalledWith(productId,
    variantDTO,);

    // Verify that the transformation to DTO was called with the service result
    expect(toProductDTO).toHaveBeenCalledWith(mockProductDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockProductDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when addVariantToProduct execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockProductService.addVariantToProduct.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(addVariantToProduct.execute(productId,
    variantDTO,)).rejects.toThrow('Service method error');
  });
});
