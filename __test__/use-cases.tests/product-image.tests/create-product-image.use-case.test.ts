import { Test, TestingModule } from '@nestjs/testing';
import { ProductImageService } from '../../../src/application/services/product-image.service';
import { CreateProductImage } from '../../../src/application/use-cases/product-image.use-cases/create-product-image.use-case';
import { ProductImageDTO } from '../../../src/presentation/dtos/product-image.dto';
import { toProductImageDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the CreateProductImage use case.
 * This test covers the initialization and behavior of the CreateProductImage class.
 * It mocks the ProductImageService service and verifies that the use case handles the business logic as expected.
 */
describe('CreateProductImage', () => {
  let createProductImage: CreateProductImage;
  let productImageService: ProductImageService;

  // Mock implementation of the ProductImageService service with jest functions
  const mockProductImageService = {
    createProductImage: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const imageDTO: ProductImageDTO = { /* data */ };

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
        CreateProductImage,
        {
          provide: ProductImageService,
          useValue: mockProductImageService,
        },
      ],
    }).compile();

    createProductImage = module.get<CreateProductImage>(CreateProductImage);
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
    mockProductImageService.createProductImage.mockResolvedValue(mockProductImageDTO);
    (toProductImageDTO as jest.Mock).mockReturnValue(mockProductImageDTO);

    // Execute the use case with provided parameters
    const result = await createProductImage.execute(imageDTO);

    // Verify that the service was called with the expected arguments
    expect(mockProductImageService.createProductImage).toHaveBeenCalledWith(imageDTO);

    // Verify that the transformation to DTO was called with the service result
    expect(toProductImageDTO).toHaveBeenCalledWith(mockProductImageDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockProductImageDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when createProductImage execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockProductImageService.createProductImage.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(createProductImage.execute(imageDTO)).rejects.toThrow('Service method error');
  });
});