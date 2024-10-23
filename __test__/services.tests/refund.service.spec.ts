import { Test, TestingModule } from '@nestjs/testing';
import { RefundService } from '../../src/application/services/refund.service';
import { IRefundRepository } from '../../src/domain/repositories/refund.repository';
import { Refund } from '../../src/domain/entities/refund.entity';
import { RefundDTO } from '../../src/presentation/dtos/refund.dto';


const mockRefundRepository = {
  create: jest.fn(),
getById: jest.fn(),
getByOrder: jest.fn(),
modify: jest.fn(),
remove: jest.fn(),
process: jest.fn(),
getByStatus: jest.fn(),
cancel: jest.fn(),
approve: jest.fn(),
issuePartial: jest.fn(),
getTotalRefunded: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('RefundService', () => {
    let service: RefundService;
    let refundRepository: IRefundRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefundService,
        {
          provide: 'IRefundRepository',
          useValue: mockRefundRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<RefundService>(RefundService);
    refundRepository = module.get<IRefundRepository>('IRefundRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create refund success and failure tests */
it('should create refund', async () => {
    /** 
     * Tests the create refund method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's createRefund method is called with the correct data.
     */
    
     const refund: RefundDTO = { /* data */ };

    const returnOject: Refund = { id: 1, /* others data */ };
    
    mockRefundRepository.create.mockResolvedValue(returnOject);

    const result = await service.createRefund(refund);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.create).toHaveBeenCalledWith(refund);
});

it('should throw an error when create refund method fails', async () => {
    
     const refund: RefundDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createRefund(refund)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get refund by id success and failure tests */
it('should get refund by id', async () => {
    /** 
     * Tests the get refund by id method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's getRefundById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Refund | null = { id: 1, /* others data */ };
    
    mockRefundRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getRefundById(id);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get refund by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getRefundById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get refunds by order success and failure tests */
it('should get refunds by order', async () => {
    /** 
     * Tests the get refunds by order method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's getRefundsByOrder method is called with the correct data.
     */
    
     const orderId: number = 1;

    const returnOject: Refund[] = [{ id: 1, /* others data */ }];
    
    mockRefundRepository.getByOrder.mockResolvedValue(returnOject);

    const result = await service.getRefundsByOrder(orderId);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.getByOrder).toHaveBeenCalledWith(orderId);
});

it('should throw an error when get refunds by order method fails', async () => {
    
     const orderId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.getByOrder.mockRejectedValue(new Error('Repository error'));

    await expect(service.getRefundsByOrder(orderId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update refund success and failure tests */
it('should update refund', async () => {
    /** 
     * Tests the update refund method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's updateRefund method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<RefundDTO> = { /* data */ };

    const returnOject: Refund = { id: 1, /* others data */ };
    
    mockRefundRepository.modify.mockResolvedValue(returnOject);

    const result = await service.updateRefund(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.modify).toHaveBeenCalledWith(id, updates);
});

it('should throw an error when update refund method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<RefundDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.modify.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateRefund(id, updates)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete refund success and failure tests */
it('should delete refund', async () => {
    /** 
     * Tests the delete refund method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's deleteRefund method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockRefundRepository.remove.mockResolvedValue(returnOject);

    const result = await service.deleteRefund(id);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.remove).toHaveBeenCalledWith(id);
});

it('should throw an error when delete refund method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.remove.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteRefund(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* process refund success and failure tests */
it('should process refund', async () => {
    /** 
     * Tests the process refund method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's processRefund method is called with the correct data.
     */
    
     const id: number = 1;
     const status: RefundStatus = { /* data */ };

    const returnOject: Refund = { id: 1, /* others data */ };
    
    mockRefundRepository.process.mockResolvedValue(returnOject);

    const result = await service.processRefund(id, status);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.process).toHaveBeenCalledWith(id, status);
});

it('should throw an error when process refund method fails', async () => {
    
     const id: number = 1;
     const status: RefundStatus = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.process.mockRejectedValue(new Error('Repository error'));

    await expect(service.processRefund(id, status)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get refunds by status success and failure tests */
it('should get refunds by status', async () => {
    /** 
     * Tests the get refunds by status method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's getRefundsByStatus method is called with the correct data.
     */
    
     const status: RefundStatus = { /* data */ };

    const returnOject: Refund[] = [{ id: 1, /* others data */ }];
    
    mockRefundRepository.getByStatus.mockResolvedValue(returnOject);

    const result = await service.getRefundsByStatus(status);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.getByStatus).toHaveBeenCalledWith(status);
});

it('should throw an error when get refunds by status method fails', async () => {
    
     const status: RefundStatus = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.getByStatus.mockRejectedValue(new Error('Repository error'));

    await expect(service.getRefundsByStatus(status)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* cancel refund success and failure tests */
it('should cancel refund', async () => {
    /** 
     * Tests the cancel refund method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's cancelRefund method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Refund = { id: 1, /* others data */ };
    
    mockRefundRepository.cancel.mockResolvedValue(returnOject);

    const result = await service.cancelRefund(id);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.cancel).toHaveBeenCalledWith(id);
});

it('should throw an error when cancel refund method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.cancel.mockRejectedValue(new Error('Repository error'));

    await expect(service.cancelRefund(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* approve refund success and failure tests */
it('should approve refund', async () => {
    /** 
     * Tests the approve refund method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's approveRefund method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Refund = { id: 1, /* others data */ };
    
    mockRefundRepository.approve.mockResolvedValue(returnOject);

    const result = await service.approveRefund(id);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.approve).toHaveBeenCalledWith(id);
});

it('should throw an error when approve refund method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.approve.mockRejectedValue(new Error('Repository error'));

    await expect(service.approveRefund(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* issue partial refund success and failure tests */
it('should issue partial refund', async () => {
    /** 
     * Tests the issue partial refund method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's issuePartialRefund method is called with the correct data.
     */
    
     const id: number = 1;
     const amount: number = 1;

    const returnOject: Refund = { id: 1, /* others data */ };
    
    mockRefundRepository.issuePartial.mockResolvedValue(returnOject);

    const result = await service.issuePartialRefund(id, amount);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.issuePartial).toHaveBeenCalledWith(id, amount);
});

it('should throw an error when issue partial refund method fails', async () => {
    
     const id: number = 1;
     const amount: number = 1;
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.issuePartial.mockRejectedValue(new Error('Repository error'));

    await expect(service.issuePartialRefund(id, amount)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get total refunded amount success and failure tests */
it('should get total refunded amount', async () => {
    /** 
     * Tests the get total refunded amount method.
     * Verifies that the returned refund matches the expected one 
     * and that the repository's getTotalRefundedAmount method is called with the correct data.
     */
    
     const orderId: number = 1;

    const returnOject: number = 1
    
    mockRefundRepository.getTotalRefunded.mockResolvedValue(returnOject);

    const result = await service.getTotalRefundedAmount(orderId);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.getTotalRefunded).toHaveBeenCalledWith(orderId);
});
it('should throw an error when get total refunded amount method fails', async () => {
    
     const orderId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockRefundRepository.getTotalRefunded.mockRejectedValue(new Error('Repository error'));

    await expect(service.getTotalRefundedAmount(orderId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});})



