import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../../src/application/services/payment.service';
import { IPaymentRepository } from '../../src/domain/repositories/payment.repository';
import { Payment } from '../../src/domain/entities/payment.entity';
import { PaymentDTO } from '../../src/presentation/dtos/payment.dto';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { Currency } from 'src/domain/enums/currencies.enum';

const mockPaymentRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getByOrderId: jest.fn(),
  getByMethod: jest.fn(),
  getByStatus: jest.fn(),
  getByDateRange: jest.fn(),
  getTotalAmountByDateRange: jest.fn(),
  getMostRecentPaymentByOrderId: jest.fn(),
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: IPaymentRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: 'IPaymentRepository',
          useValue: mockPaymentRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<IPaymentRepository>('IPaymentRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* create payment success and failure tests */
  it('should create payment', async () => {
    /**
     * Tests the create payment method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's createPayment method is called with the correct data.
     */

    const paymentDTO: PaymentDTO = {
      id: 1,
      orderId: 1,
      order: undefined,
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    };

    const returnOject: Payment = {
      id: 1,
      orderId: 1,
      order: undefined, // Remplacez par un objet Order si nécessaire
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    };

    mockPaymentRepository.create.mockResolvedValue(returnOject);

    const result = await service.createPayment(paymentDTO);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.create).toHaveBeenCalledWith(paymentDTO);
  });

  it('should throw an error when create payment method fails', async () => {
    const paymentDTO: PaymentDTO = {
      id: 1,
      orderId: 1,
      order: undefined,
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    };

    // Simulate a failure when calling the repository
    mockPaymentRepository.create.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.createPayment(paymentDTO)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get payment by id success and failure tests */
  it('should get payment by id', async () => {
    /**
     * Tests the get payment by id method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's getPaymentById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Payment | null = {
      id: 1,
      orderId: 1,
      order: undefined, // Remplacez par un objet Order si nécessaire
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    };

    mockPaymentRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getPaymentById(id);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get payment by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockPaymentRepository.getById.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getPaymentById(id)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* update payment success and failure tests */
  it('should update payment', async () => {
    /**
     * Tests the update payment method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's updatePayment method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<PaymentDTO> = {
      id: 1,
      orderId: 1,
      order: undefined,
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    };

    const returnOject: Payment = {
      id: 1,
      orderId: 1,
      order: undefined, // Remplacez par un objet Order si nécessaire
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    };

    mockPaymentRepository.update.mockResolvedValue(returnOject);

    const result = await service.updatePayment(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.update).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update payment method fails', async () => {
    const id: number = 1;
    const updates: Partial<PaymentDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockPaymentRepository.update.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.updatePayment(id, updates)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* delete payment success and failure tests */
  it('should delete payment', async () => {
    /**
     * Tests the delete payment method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's deletePayment method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockPaymentRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deletePayment(id);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete payment method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockPaymentRepository.delete.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.deletePayment(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get payments by order id success and failure tests */
  it('should get payments by order id', async () => {
    /**
     * Tests the get payments by order id method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's getPaymentsByOrderId method is called with the correct data.
     */

    const orderId: number = 1;

    const returnOject: Payment[] = [{
      id: 1,
      orderId: 1,
      order: undefined, // Remplacez par un objet Order si nécessaire
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    }];

    mockPaymentRepository.getByOrderId.mockResolvedValue(returnOject);

    const result = await service.getPaymentsByOrderId(orderId);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getByOrderId).toHaveBeenCalledWith(orderId);
  });

  it('should throw an error when get payments by order id method fails', async () => {
    const orderId: number = 1;

    // Simulate a failure when calling the repository
    mockPaymentRepository.getByOrderId.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getPaymentsByOrderId(orderId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get payments by method success and failure tests */
  it('should get payments by method', async () => {
    /**
     * Tests the get payments by method method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's getPaymentsByMethod method is called with the correct data.
     */

    const method: string = 'method';

    const returnOject: Payment[] = [{
      id: 1,
      orderId: 1,
      order: undefined, // Remplacez par un objet Order si nécessaire
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    }];

    mockPaymentRepository.getByMethod.mockResolvedValue(returnOject);

    const result = await service.getPaymentsByMethod(method);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getByMethod).toHaveBeenCalledWith(method);
  });

  it('should throw an error when get payments by method method fails', async () => {
    const method: string = 'method';

    // Simulate a failure when calling the repository
    mockPaymentRepository.getByMethod.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getPaymentsByMethod(method)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get payments by status success and failure tests */
  it('should get payments by status', async () => {
    /**
     * Tests the get payments by status method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's getPaymentsByStatus method is called with the correct data.
     */

    const status: PaymentStatus = PaymentStatus.PENDING;

    const returnOject: Payment[] = [{
      id: 1,
      orderId: 1,
      order: undefined, // Remplacez par un objet Order si nécessaire
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    }];

    mockPaymentRepository.getByStatus.mockResolvedValue(returnOject);

    const result = await service.getPaymentsByStatus(status);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getByStatus).toHaveBeenCalledWith(status);
  });

  it('should throw an error when get payments by status method fails', async () => {
    const status: PaymentStatus = PaymentStatus.PENDING;

    // Simulate a failure when calling the repository
    mockPaymentRepository.getByStatus.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getPaymentsByStatus(status)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get payments by date range success and failure tests */
  it('should get payments by date range', async () => {
    /**
     * Tests the get payments by date range method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's getPaymentsByDateRange method is called with the correct data.
     */

    const startDate: Date = new Date('2024-01-01');
    const endDate: Date = new Date('2024-01-31');

    const returnOject: Payment[] = [{
      id: 1,
      orderId: 1,
      order: undefined, // Remplacez par un objet Order si nécessaire
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    }];

    mockPaymentRepository.getByDateRange.mockResolvedValue(returnOject);

    const result = await service.getPaymentsByDateRange(startDate, endDate);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getByDateRange).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });

  it('should throw an error when get payments by date range method fails', async () => {
    const startDate: Date = new Date('2024-01-01');
    const endDate: Date = new Date('2024-01-31');

    // Simulate a failure when calling the repository
    mockPaymentRepository.getByDateRange.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.getPaymentsByDateRange(startDate, endDate),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get total amount by date range success and failure tests */
  it('should get total amount by date range', async () => {
    /**
     * Tests the get total amount by date range method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's getTotalAmountByDateRange method is called with the correct data.
     */

    const startDate: Date = new Date('2024-01-01');
    const endDate: Date = new Date('2024-01-31');

    const returnOject: number = 1;

    mockPaymentRepository.getTotalAmountByDateRange.mockResolvedValue(
      returnOject,
    );

    const result = await service.getTotalAmountByDateRange(startDate, endDate);
    expect(result).toEqual(returnOject);
    expect(
      mockPaymentRepository.getTotalAmountByDateRange,
    ).toHaveBeenCalledWith(startDate, endDate);
  });

  it('should throw an error when get total amount by date range method fails', async () => {
    const startDate: Date = new Date('2024-01-01');
    const endDate: Date = new Date('2024-01-31');

    // Simulate a failure when calling the repository
    mockPaymentRepository.getTotalAmountByDateRange.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.getTotalAmountByDateRange(startDate, endDate),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get most recent payment by order id success and failure tests */
  it('should get most recent payment by order id', async () => {
    /**
     * Tests the get most recent payment by order id method.
     * Verifies that the returned payment matches the expected one
     * and that the repository's getMostRecentPaymentByOrderId method is called with the correct data.
     */

    const orderId: number = 1;

    const returnOject: Payment | null = {
      id: 1,
      orderId: 1,
      order: undefined, // Remplacez par un objet Order si nécessaire
      method: 'credit_card',
      status: PaymentStatus.PENDING,
      amount: 100.0,
      currency: Currency.USD,
      createdAt: new Date('2024-01-01'),
    };

    mockPaymentRepository.getMostRecentPaymentByOrderId.mockResolvedValue(
      returnOject,
    );

    const result = await service.getMostRecentPaymentByOrderId(orderId);
    expect(result).toEqual(returnOject);
    expect(
      mockPaymentRepository.getMostRecentPaymentByOrderId,
    ).toHaveBeenCalledWith(orderId);
  });

  it('should throw an error when get most recent payment by order id method fails', async () => {
    const orderId: number = 1;

    // Simulate a failure when calling the repository
    mockPaymentRepository.getMostRecentPaymentByOrderId.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.getMostRecentPaymentByOrderId(orderId),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});
