import { Test, TestingModule } from '@nestjs/testing';
import { CartItemService } from '../../../src/application/services/cart-item.service';
import { CreateCartItem } from '../../../src/application/use-cases/cart-item.use-cases/create-cart-item.use-case';
import { CartItemDTO } from '../../../src/presentation/dtos/cart-item.dto';
import { toCartItemDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the CreateCartItem use case.
 * This test covers the initialization and behavior of the CreateCartItem class.
 * It mocks the CartItemService service and verifies that the use case handles the business logic as expected.
 */
describe('CreateCartItem', () => {
  let createCartItem: CreateCartItem;
  let cartItemService: CartItemService;

  // Mock implementation of the CartItemService service with jest functions
  const mockCartItemService = {
    createCartItem: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const cartItemDTO: CartItemDTO = { /* data */ };

  // Mock version of  to be used as input and expected output
  const mockCartItemDTO: CartItemDTO = {
    // TODO: Fill in your CartItemDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCartItem,
        {
          provide: CartItemService,
          useValue: mockCartItemService,
        },
      ],
    }).compile();

    createCartItem = module.get<CreateCartItem>(CreateCartItem);
    cartItemService = module.get<CartItemService>(CartItemService);
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
    mockCartItemService.createCartItem.mockResolvedValue(mockCartItemDTO);
    (toCartItemDTO as jest.Mock).mockReturnValue(mockCartItemDTO);

    // Execute the use case with provided parameters
    const result = await createCartItem.execute(cartItemDTO);

    // Verify that the service was called with the expected arguments
    expect(mockCartItemService.createCartItem).toHaveBeenCalledWith(cartItemDTO);

    // Verify that the transformation to DTO was called with the service result
    expect(toCartItemDTO).toHaveBeenCalledWith(mockCartItemDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockCartItemDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when createCartItem execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockCartItemService.createCartItem.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(createCartItem.execute(cartItemDTO)).rejects.toThrow('Service method error');
  });
});
