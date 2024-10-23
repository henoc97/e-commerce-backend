import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../../src/application/services/order.service';
import { FetchOrdersByUserId } from '../../../src/application/use-cases/order.use-cases/fetch-orders-by-user-id.use-case';
import { OrderDTO } from '../../../src/presentation/dtos/order.dto';
import { toOrderDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchOrdersByUserId use case.
 * This test covers the initialization and behavior of the FetchOrdersByUserId class.
 * It mocks the OrderService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchOrdersByUserId', () => {
  let fetchOrdersByUserId: FetchOrdersByUserId;
  let orderService: OrderService;

  // Mock implementation of the OrderService service with jest functions
  const mockOrderService = {
    fetchOrdersByUserId: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const userId: number = 1;

  // Mock version of  to be used as input and expected output
  const mockOrderDTO: OrderDTO = {
    // TODO: Fill in your OrderDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchOrdersByUserId,
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    fetchOrdersByUserId = module.get<FetchOrdersByUserId>(FetchOrdersByUserId);
    orderService = module.get<OrderService>(OrderService);
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
    mockOrderService.fetchOrdersByUserId.mockResolvedValue(mockOrderDTO);
    (toOrderDTO as jest.Mock).mockReturnValue(mockOrderDTO);

    // Execute the use case with provided parameters
    const result = await fetchOrdersByUserId.execute(userId);

    // Verify that the service was called with the expected arguments
    expect(mockOrderService.fetchOrdersByUserId).toHaveBeenCalledWith(userId);

    // Verify that the transformation to DTO was called with the service result
    expect(toOrderDTO).toHaveBeenCalledWith(mockOrderDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockOrderDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchOrdersByUserId execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockOrderService.fetchOrdersByUserId.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(fetchOrdersByUserId.execute(userId)).rejects.toThrow('Service method error');
  });
});
