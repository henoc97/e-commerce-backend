import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantService } from '../../../src/application/services/product-variant.service';
import { CreateProductVariant } from '../../../src/application/use-cases/product-variant.use-cases/create-product-variant.use-case';
import { ProductVariantDTO } from '../../../src/presentation/dtos/product-variant.dto';
import { toProductVariantDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the CreateProductVariant use case.
 * This test covers the initialization and behavior of the CreateProductVariant class.
 * It mocks the ProductVariantService service and verifies that the use case handles the business logic as expected.
 */
describe('CreateProductVariant', () => {
  let createProductVariant: CreateProductVariant;
  let productVariantService: ProductVariantService;

  // Mock implementation of the ProductVariantService service with jest functions
  const mockProductVariantService = {
    createProductVariant: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const variantDTO: ProductVariantDTO = { /* data */ };

  // Mock version of  to be used as input and expected output
  const mockProductVariantDTO: ProductVariantDTO = {
    // TODO: Fill in your ProductVariantDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductVariant,
        {
          provide: ProductVariantService,
          useValue: mockProductVariantService,
        },
      ],
    }).compile();

    createProductVariant = module.get<CreateProductVariant>(CreateProductVariant);
    productVariantService = module.get<ProductVariantService>(ProductVariantService);
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
    mockProductVariantService.createProductVariant.mockResolvedValue(mockProductVariantDTO);
    (toProductVariantDTO as jest.Mock).mockReturnValue(mockProductVariantDTO);

    // Execute the use case with provided parameters
    const result = await createProductVariant.execute(variantDTO,);

    // Verify that the service was called with the expected arguments
    expect(mockProductVariantService.createProductVariant).toHaveBeenCalledWith(variantDTO,);

    // Verify that the transformation to DTO was called with the service result
    expect(toProductVariantDTO).toHaveBeenCalledWith(mockProductVariantDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockProductVariantDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when createProductVariant execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockProductVariantService.createProductVariant.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(createProductVariant.execute(variantDTO,)).rejects.toThrow('Service method error');
  });
});
