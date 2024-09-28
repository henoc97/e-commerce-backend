import { Test, TestingModule } from '@nestjs/testing';
import { RefundService } from '../../../src/application/services/refund.service';
import { ApproveRefund } from '../../../src/application/use-cases/refund.use-cases/approve-refund.use-case';
import { RefundDTO } from '../../../src/presentation/dtos/refund.dto';
import { toRefundDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the ApproveRefund use case.
 * This test covers the initialization and behavior of the ApproveRefund class.
 * It mocks the RefundService service and verifies that the use case handles the business logic as expected.
 */
describe('ApproveRefund', () => {
  let approveRefund: ApproveRefund;
  let refundService: RefundService;

  // Mock implementation of the RefundService service with jest functions
  const mockRefundService = {
    approveRefund: jest.fn(),
  };

  // Define parameters for the use case to be used during testing

  const id: number = 1;

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
        ApproveRefund,
        {
          provide: RefundService,
          useValue: mockRefundService,
        },
      ],
    }).compile();

    approveRefund = module.get<ApproveRefund>(ApproveRefund);
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
    mockRefundService.approveRefund.mockResolvedValue(mockRefundDTO);
    (toRefundDTO as jest.Mock).mockReturnValue(mockRefundDTO);

    // Execute the use case with provided parameters
    const result = await approveRefund.execute(id);

    // Verify that the service was called with the expected arguments
    expect(mockRefundService.approveRefund).toHaveBeenCalledWith(id);

    // Verify that the transformation to DTO was called with the service result
    expect(toRefundDTO).toHaveBeenCalledWith(mockRefundDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockRefundDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when approveRefund execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockRefundService.approveRefund.mockRejectedValue('Service method error');

    // Verify that the use case throws an error when service method fails
    await expect(approveRefund.execute(id)).rejects.toThrow(
      'Service method error',
    );
  });
});
