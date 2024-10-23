import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../../../src/application/services/cart.service';
import { CreateCart } from '../../../src/application/use-cases/cart.use-cases/create-cart.use-case';
import { CartDTO } from '../../../src/presentation/dtos/cart.dto';
import { toCartDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the CreateCart use case.
 * This test covers the initialization and behavior of the CreateCart class.
 * It mocks the CartService service and verifies that the use case handles the business logic as expected.
 */
describe('CreateCart', () => {
  let createCart: CreateCart;
  let cartService: CartService;

  // Mock implementation of the CartService service with jest functions
  const mockCartService = {
    createCart: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const cartDTO: CartDTO = { /* data */ };

  // Mock version of  to be used as input and expected output
  const mockCartDTO: CartDTO = {
    // TODO: Fill in your CartDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCart,
        {
          provide: CartService,
          useValue: mockCartService,
        },
      ],
    }).compile();

    createCart = module.get<CreateCart>(CreateCart);
    cartService = module.get<CartService>(CartService);
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
    mockCartService.createCart.mockResolvedValue(mockCartDTO);
    (toCartDTO as jest.Mock).mockReturnValue(mockCartDTO);

    // Execute the use case with provided parameters
    const result = await createCart.execute(cartDTO);

    // Verify that the service was called with the expected arguments
    expect(mockCartService.createCart).toHaveBeenCalledWith(cartDTO);

    // Verify that the transformation to DTO was called with the service result
    expect(toCartDTO).toHaveBeenCalledWith(mockCartDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockCartDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when createCart execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockCartService.createCart.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(createCart.execute(cartDTO)).rejects.toThrow('Service method error');
  });
});
