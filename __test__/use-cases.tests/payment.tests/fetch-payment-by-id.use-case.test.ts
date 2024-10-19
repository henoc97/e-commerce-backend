import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../../../src/application/services/payment.service';
import { FetchPaymentById } from '../../../src/application/use-cases/payment.use-cases/fetch-payment-by-id.use-case';
import { PaymentDTO } from '../../../src/presentation/dtos/payment.dto';
import { toPaymentDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchPaymentById use case.
 * This test covers the initialization and behavior of the FetchPaymentById class.
 * It mocks the PaymentService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchPaymentById', () => {
  let fetchPaymentById: FetchPaymentById;
  let paymentService: PaymentService;

  // Mock implementation of the PaymentService service with jest functions
  const mockPaymentService = {
    fetchPaymentById: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const id: number = 1;

  // Mock version of  to be used as input and expected output
  const mockPaymentDTO: PaymentDTO = {
    // TODO: Fill in your PaymentDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchPaymentById,
        {
          provide: PaymentService,
          useValue: mockPaymentService,
        },
      ],
    }).compile();

    fetchPaymentById = module.get<FetchPaymentById>(FetchPaymentById);
    paymentService = module.get<PaymentService>(PaymentService);
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
    mockPaymentService.fetchPaymentById.mockResolvedValue(mockPaymentDTO);
    (toPaymentDTO as jest.Mock).mockReturnValue(mockPaymentDTO);

    // Execute the use case with provided parameters
    const result = await fetchPaymentById.execute(id);

    // Verify that the service was called with the expected arguments
    expect(mockPaymentService.fetchPaymentById).toHaveBeenCalledWith(id);

    // Verify that the transformation to DTO was called with the service result
    expect(toPaymentDTO).toHaveBeenCalledWith(mockPaymentDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockPaymentDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchPaymentById execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockPaymentService.fetchPaymentById.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(fetchPaymentById.execute(id)).rejects.toThrow('Service method error');
  });
});
