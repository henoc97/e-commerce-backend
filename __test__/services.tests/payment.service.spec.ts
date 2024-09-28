import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../../src/application/services/payment.service';
import { IPaymentRepository } from '../../src/domain/repositories/payment.repository';
import { Payment } from '../../src/domain/entities/payment.entity';
import { PaymentDTO } from '../../src/presentation/dtos/payment.dto';


const mockPaymentRepository = {
  createPayment: jest.fn(),
getPaymentById: jest.fn(),
updatePayment: jest.fn(),
deletePayment: jest.fn(),
getPaymentsByOrderId: jest.fn(),
getPaymentsByMethod: jest.fn(),
getPaymentsByStatus: jest.fn(),
getPaymentsByDateRange: jest.fn(),
getTotalAmountByDateRange: jest.fn(),
getMostRecentPaymentByOrderId: jest.fn(),
getPaymentsGroupedByMethod: jest.fn()
};

describe('PaymentService', () => {
    let service: PaymentService;
    let paymentRepository: IPaymentRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: 'PaymentRepository',
          useValue: mockPaymentRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<IPaymentRepository>('PaymentRepository');
  });

    /* create payment success and failure tests */
it('should create payment', async () => {
    /** 
     * Tests the create payment method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's createPayment method is called with the correct data.
     */
    
     const paymentDTO: PaymentDTO = { /* data */ };

    const returnOject: Payment = { id: 1, /* others data */ }
    
    mockPaymentRepository.createPayment.mockResolvedValue(returnOject);

    const result = await service.createPayment(paymentDTO);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.createPayment).toHaveBeenCalledWith(paymentDTO);
});

it('should throw an error when create payment method fails', async () => {
    
     const paymentDTO: PaymentDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.createPayment.mockResolvedValue(" Repository error");

    const result = await service.createPayment(paymentDTO);
    expect(result).rejects.toThrow('Repository error');
});

/* get payment by id success and failure tests */
it('should get payment by id', async () => {
    /** 
     * Tests the get payment by id method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's getPaymentById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Payment | null = { id: 1, /* others data */ }
    
    mockPaymentRepository.getPaymentById.mockResolvedValue(returnOject);

    const result = await service.getPaymentById(id);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getPaymentById).toHaveBeenCalledWith(id);
});

it('should throw an error when get payment by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.getPaymentById.mockResolvedValue(" Repository error");

    const result = await service.getPaymentById(id);
    expect(result).rejects.toThrow('Repository error');
});

/* update payment success and failure tests */
it('should update payment', async () => {
    /** 
     * Tests the update payment method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's updatePayment method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<PaymentDTO> = { /* data */ };

    const returnOject: Payment = { id: 1, /* others data */ }
    
    mockPaymentRepository.updatePayment.mockResolvedValue(returnOject);

    const result = await service.updatePayment(id,
    updates,);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.updatePayment).toHaveBeenCalledWith(id,
    updates,);
});

it('should throw an error when update payment method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<PaymentDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.updatePayment.mockResolvedValue(" Repository error");

    const result = await service.updatePayment(id,
    updates,);
    expect(result).rejects.toThrow('Repository error');
});

/* delete payment success and failure tests */
it('should delete payment', async () => {
    /** 
     * Tests the delete payment method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's deletePayment method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockPaymentRepository.deletePayment.mockResolvedValue(returnOject);

    const result = await service.deletePayment(id);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.deletePayment).toHaveBeenCalledWith(id);
});

it('should throw an error when delete payment method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.deletePayment.mockResolvedValue(" Repository error");

    const result = await service.deletePayment(id);
    expect(result).rejects.toThrow('Repository error');
});

/* get payments by order id success and failure tests */
it('should get payments by order id', async () => {
    /** 
     * Tests the get payments by order id method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's getPaymentsByOrderId method is called with the correct data.
     */
    
     const orderId: number = 1;

    const returnOject: Payment[] = [{ id: 1, /* others data */ }]
    
    mockPaymentRepository.getPaymentsByOrderId.mockResolvedValue(returnOject);

    const result = await service.getPaymentsByOrderId(orderId);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getPaymentsByOrderId).toHaveBeenCalledWith(orderId);
});

it('should throw an error when get payments by order id method fails', async () => {
    
     const orderId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.getPaymentsByOrderId.mockResolvedValue(" Repository error");

    const result = await service.getPaymentsByOrderId(orderId);
    expect(result).rejects.toThrow('Repository error');
});

/* get payments by method success and failure tests */
it('should get payments by method', async () => {
    /** 
     * Tests the get payments by method method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's getPaymentsByMethod method is called with the correct data.
     */
    
     const method: string = 'method';

    const returnOject: Payment[] = [{ id: 1, /* others data */ }]
    
    mockPaymentRepository.getPaymentsByMethod.mockResolvedValue(returnOject);

    const result = await service.getPaymentsByMethod(method);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getPaymentsByMethod).toHaveBeenCalledWith(method);
});

it('should throw an error when get payments by method method fails', async () => {
    
     const method: string = 'method';
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.getPaymentsByMethod.mockResolvedValue(" Repository error");

    const result = await service.getPaymentsByMethod(method);
    expect(result).rejects.toThrow('Repository error');
});

/* get payments by status success and failure tests */
it('should get payments by status', async () => {
    /** 
     * Tests the get payments by status method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's getPaymentsByStatus method is called with the correct data.
     */
    
     const status: PaymentStatus = { /* data */ };

    const returnOject: Payment[] = [{ id: 1, /* others data */ }]
    
    mockPaymentRepository.getPaymentsByStatus.mockResolvedValue(returnOject);

    const result = await service.getPaymentsByStatus(status);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getPaymentsByStatus).toHaveBeenCalledWith(status);
});

it('should throw an error when get payments by status method fails', async () => {
    
     const status: PaymentStatus = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.getPaymentsByStatus.mockResolvedValue(" Repository error");

    const result = await service.getPaymentsByStatus(status);
    expect(result).rejects.toThrow('Repository error');
});

/* get payments by date range success and failure tests */
it('should get payments by date range', async () => {
    /** 
     * Tests the get payments by date range method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's getPaymentsByDateRange method is called with the correct data.
     */
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };

    const returnOject: Payment[] = [{ id: 1, /* others data */ }]
    
    mockPaymentRepository.getPaymentsByDateRange.mockResolvedValue(returnOject);

    const result = await service.getPaymentsByDateRange(startDate,
    endDate,);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getPaymentsByDateRange).toHaveBeenCalledWith(startDate,
    endDate,);
});

it('should throw an error when get payments by date range method fails', async () => {
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.getPaymentsByDateRange.mockResolvedValue(" Repository error");

    const result = await service.getPaymentsByDateRange(startDate,
    endDate,);
    expect(result).rejects.toThrow('Repository error');
});

/* get total amount by date range success and failure tests */
it('should get total amount by date range', async () => {
    /** 
     * Tests the get total amount by date range method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's getTotalAmountByDateRange method is called with the correct data.
     */
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };

    const returnOject: number = 1
    
    mockPaymentRepository.getTotalAmountByDateRange.mockResolvedValue(returnOject);

    const result = await service.getTotalAmountByDateRange(startDate,
    endDate,);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getTotalAmountByDateRange).toHaveBeenCalledWith(startDate,
    endDate,);
});

it('should throw an error when get total amount by date range method fails', async () => {
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.getTotalAmountByDateRange.mockResolvedValue(" Repository error");

    const result = await service.getTotalAmountByDateRange(startDate,
    endDate,);
    expect(result).rejects.toThrow('Repository error');
});

/* get most recent payment by order id success and failure tests */
it('should get most recent payment by order id', async () => {
    /** 
     * Tests the get most recent payment by order id method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's getMostRecentPaymentByOrderId method is called with the correct data.
     */
    
     const orderId: number = 1;

    const returnOject: Payment | null = { id: 1, /* others data */ }
    
    mockPaymentRepository.getMostRecentPaymentByOrderId.mockResolvedValue(returnOject);

    const result = await service.getMostRecentPaymentByOrderId(orderId,);
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getMostRecentPaymentByOrderId).toHaveBeenCalledWith(orderId,);
});

it('should throw an error when get most recent payment by order id method fails', async () => {
    
     const orderId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.getMostRecentPaymentByOrderId.mockResolvedValue(" Repository error");

    const result = await service.getMostRecentPaymentByOrderId(orderId,);
    expect(result).rejects.toThrow('Repository error');
});

/* get payments grouped by method success and failure tests */
it('should get payments grouped by method', async () => {
    /** 
     * Tests the get payments grouped by method method.
     * Verifies that the returned payment matches the expected one 
     * and that the repository's getPaymentsGroupedByMethod method is called with the correct data.
     */
    

    const returnOject: Map<string, Payment[] = string-value
    
    mockPaymentRepository.getPaymentsGroupedByMethod.mockResolvedValue(returnOject);

    const result = await service.getPaymentsGroupedByMethod();
    expect(result).toEqual(returnOject);
    expect(mockPaymentRepository.getPaymentsGroupedByMethod).toHaveBeenCalledWith();
});

it('should throw an error when get payments grouped by method method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockPaymentRepository.getPaymentsGroupedByMethod.mockResolvedValue(" Repository error");

    const result = await service.getPaymentsGroupedByMethod();
    expect(result).rejects.toThrow('Repository error');
});

})
