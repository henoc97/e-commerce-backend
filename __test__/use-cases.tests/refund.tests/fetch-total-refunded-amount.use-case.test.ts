import { Test, TestingModule } from '@nestjs/testing';
import { RefundService } from '../../../src/application/services/refund.service';
import { FetchTotalRefundedAmount } from '../../../src/application/use-cases/refund.use-cases/fetch-total-refunded-amount.use-case';
import { RefundDTO } from '../../../src/presentation/dtos/refund.dto';
import { toRefundDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchTotalRefundedAmount use case.
 * This test covers the initialization and behavior of the FetchTotalRefundedAmount class.
 * It mocks the RefundService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchTotalRefundedAmount', () => {
  let fetchTotalRefundedAmount: FetchTotalRefundedAmount;
  let refundService: RefundService;

  // Mock implementation of the RefundService service with jest functions
  const mockRefundService = {
    fetchTotalRefundedAmount: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const orderId: number = 1;

  // Mock version of  to be used as input and expected output
  const mockRefundDTO: RefundDTO = {
    // TODO: Fill in your RefundDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchTotalRefundedAmount,
        {
          provide: RefundService,
          useValue: mockRefundService,
        },
      ],
    }).compile();

    fetchTotalRefundedAmount = module.get<FetchTotalRefundedAmount>(FetchTotalRefundedAmount);
    refundService = module.get<RefundService>(RefundService);
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
    mockRefundService.fetchTotalRefundedAmount.mockResolvedValue(mockRefundDTO);
    (toRefundDTO as jest.Mock).mockReturnValue(mockRefundDTO);

    // Execute the use case with provided parameters
    const result = await fetchTotalRefundedAmount.execute(orderId);

    // Verify that the service was called with the expected arguments
    expect(mockRefundService.fetchTotalRefundedAmount).toHaveBeenCalledWith(orderId);

    // Verify that the transformation to DTO was called with the service result
    expect(toRefundDTO).toHaveBeenCalledWith(mockRefundDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockRefundDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchTotalRefundedAmount execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockRefundService.fetchTotalRefundedAmount.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(fetchTotalRefundedAmount.execute(orderId)).rejects.toThrow('Service method error');
  });
});