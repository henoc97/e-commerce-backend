import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../../src/application/services/order.service';
import { UpdateOrderStatus } from '../../../src/application/use-cases/order.use-cases/update-order-status.use-case';
import { OrderDTO } from '../../../src/presentation/dtos/order.dto';
import { toOrderDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the UpdateOrderStatus use case.
 * This test covers the initialization and behavior of the UpdateOrderStatus class.
 * It mocks the OrderService service and verifies that the use case handles the business logic as expected.
 */
describe('UpdateOrderStatus', () => {
  let updateOrderStatus: UpdateOrderStatus;
  let orderService: OrderService;

  // Mock implementation of the OrderService service with jest functions
  const mockOrderService = {
    updateOrderStatus: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const orderId: number = 1;
     const status: string = 'status';

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
        UpdateOrderStatus,
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    updateOrderStatus = module.get<UpdateOrderStatus>(UpdateOrderStatus);
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
    mockOrderService.updateOrderStatus.mockResolvedValue(mockOrderDTO);
    (toOrderDTO as jest.Mock).mockReturnValue(mockOrderDTO);

    // Execute the use case with provided parameters
    const result = await updateOrderStatus.execute(orderId, status);

    // Verify that the service was called with the expected arguments
    expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith(orderId, status);

    // Verify that the transformation to DTO was called with the service result
    expect(toOrderDTO).toHaveBeenCalledWith(mockOrderDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockOrderDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when updateOrderStatus execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockOrderService.updateOrderStatus.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(updateOrderStatus.execute(orderId, status)).rejects.toThrow('Service method error');
  });
});
