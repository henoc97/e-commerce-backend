import { Test, TestingModule } from '@nestjs/testing';
import { RefundService } from '../../src/application/services/refund.service';
import { IRefundRepository } from '../../src/domain/repositories/refund.repository';
import { Refund } from '../../src/domain/entities/refund.entity';
import { RefundDTO } from '../../src/presentation/dtos/refund.dto';

const mockRefundRepository = {
  createRefund: jest.fn(),
  getRefundById: jest.fn(),
  getRefundsByOrder: jest.fn(),
  updateRefund: jest.fn(),
  deleteRefund: jest.fn(),
  processRefund: jest.fn(),
  getRefundsByStatus: jest.fn(),
  cancelRefund: jest.fn(),
  approveRefund: jest.fn(),
  issuePartialRefund: jest.fn(),
  getTotalRefundedAmount: jest.fn(),
};

describe('RefundService', () => {
  let service: RefundService;
  let refundRepository: IRefundRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefundService,
        {
          provide: 'RefundRepository',
          useValue: mockRefundRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<RefundService>(RefundService);
    refundRepository = module.get<IRefundRepository>('RefundRepository');
  });

  /* create refund success and failure tests */
  it('should create refund', async () => {
    /**
     * Tests the create refund method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's createRefund method is called with the correct data.
     */

    const refund: RefundDTO = {
      /* data */
    };

    const returnOject: Refund = { id: 1 /* others data */ };

    mockRefundRepository.createRefund.mockResolvedValue(returnOject);

    const result = await service.createRefund(refund);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.createRefund).toHaveBeenCalledWith(refund);
  });

  it('should throw an error when create refund method fails', async () => {
    const refund: RefundDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockRefundRepository.createRefund.mockResolvedValue(' Repository error');

    const result = await service.createRefund(refund);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get refund by id success and failure tests */
  it('should get refund by id', async () => {
    /**
     * Tests the get refund by id method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's getRefundById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Refund | null = { id: 1 /* others data */ };

    mockRefundRepository.getRefundById.mockResolvedValue(returnOject);

    const result = await service.getRefundById(id);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.getRefundById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get refund by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockRefundRepository.getRefundById.mockResolvedValue(' Repository error');

    const result = await service.getRefundById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get refunds by order success and failure tests */
  it('should get refunds by order', async () => {
    /**
     * Tests the get refunds by order method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's getRefundsByOrder method is called with the correct data.
     */

    const orderId: number = 1;

    const returnOject: Refund[] = [{ id: 1 /* others data */ }];

    mockRefundRepository.getRefundsByOrder.mockResolvedValue(returnOject);

    const result = await service.getRefundsByOrder(orderId);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.getRefundsByOrder).toHaveBeenCalledWith(
      orderId,
    );
  });

  it('should throw an error when get refunds by order method fails', async () => {
    const orderId: number = 1;

    // Simulate a failure when calling the repository
    mockRefundRepository.getRefundsByOrder.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getRefundsByOrder(orderId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update refund success and failure tests */
  it('should update refund', async () => {
    /**
     * Tests the update refund method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's updateRefund method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<RefundDTO> = {
      /* data */
    };

    const returnOject: Refund = { id: 1 /* others data */ };

    mockRefundRepository.updateRefund.mockResolvedValue(returnOject);

    const result = await service.updateRefund(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.updateRefund).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update refund method fails', async () => {
    const id: number = 1;
    const updates: Partial<RefundDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockRefundRepository.updateRefund.mockResolvedValue(' Repository error');

    const result = await service.updateRefund(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete refund success and failure tests */
  it('should delete refund', async () => {
    /**
     * Tests the delete refund method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's deleteRefund method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockRefundRepository.deleteRefund.mockResolvedValue(returnOject);

    const result = await service.deleteRefund(id);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.deleteRefund).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete refund method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockRefundRepository.deleteRefund.mockResolvedValue(' Repository error');

    const result = await service.deleteRefund(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* process refund success and failure tests */
  it('should process refund', async () => {
    /**
     * Tests the process refund method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's processRefund method is called with the correct data.
     */

    const id: number = 1;
    const status: RefundStatus = {
      /* data */
    };

    const returnOject: Refund = { id: 1 /* others data */ };

    mockRefundRepository.processRefund.mockResolvedValue(returnOject);

    const result = await service.processRefund(id, status);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.processRefund).toHaveBeenCalledWith(id, status);
  });

  it('should throw an error when process refund method fails', async () => {
    const id: number = 1;
    const status: RefundStatus = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockRefundRepository.processRefund.mockResolvedValue(' Repository error');

    const result = await service.processRefund(id, status);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get refunds by status success and failure tests */
  it('should get refunds by status', async () => {
    /**
     * Tests the get refunds by status method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's getRefundsByStatus method is called with the correct data.
     */

    const status: RefundStatus = {
      /* data */
    };

    const returnOject: Refund[] = [{ id: 1 /* others data */ }];

    mockRefundRepository.getRefundsByStatus.mockResolvedValue(returnOject);

    const result = await service.getRefundsByStatus(status);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.getRefundsByStatus).toHaveBeenCalledWith(
      status,
    );
  });

  it('should throw an error when get refunds by status method fails', async () => {
    const status: RefundStatus = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockRefundRepository.getRefundsByStatus.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getRefundsByStatus(status);
    expect(result).rejects.toThrow('Repository error');
  });

  /* cancel refund success and failure tests */
  it('should cancel refund', async () => {
    /**
     * Tests the cancel refund method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's cancelRefund method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Refund = { id: 1 /* others data */ };

    mockRefundRepository.cancelRefund.mockResolvedValue(returnOject);

    const result = await service.cancelRefund(id);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.cancelRefund).toHaveBeenCalledWith(id);
  });

  it('should throw an error when cancel refund method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockRefundRepository.cancelRefund.mockResolvedValue(' Repository error');

    const result = await service.cancelRefund(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* approve refund success and failure tests */
  it('should approve refund', async () => {
    /**
     * Tests the approve refund method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's approveRefund method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Refund = { id: 1 /* others data */ };

    mockRefundRepository.approveRefund.mockResolvedValue(returnOject);

    const result = await service.approveRefund(id);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.approveRefund).toHaveBeenCalledWith(id);
  });

  it('should throw an error when approve refund method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockRefundRepository.approveRefund.mockResolvedValue(' Repository error');

    const result = await service.approveRefund(id);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: Refund = { id: 1 /* others data */ };

    mockRefundRepository.issuePartialRefund.mockResolvedValue(returnOject);

    const result = await service.issuePartialRefund(id, amount);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.issuePartialRefund).toHaveBeenCalledWith(
      id,
      amount,
    );
  });

  it('should throw an error when issue partial refund method fails', async () => {
    const id: number = 1;
    const amount: number = 1;

    // Simulate a failure when calling the repository
    mockRefundRepository.issuePartialRefund.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.issuePartialRefund(id, amount);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get total refunded amount success and failure tests */
  it('should get total refunded amount', async () => {
    /**
     * Tests the get total refunded amount method.
     * Verifies that the returned refund matches the expected one
     * and that the repository's getTotalRefundedAmount method is called with the correct data.
     */

    const orderId: number = 1;

    const returnOject: number = 1;

    mockRefundRepository.getTotalRefundedAmount.mockResolvedValue(returnOject);

    const result = await service.getTotalRefundedAmount(orderId);
    expect(result).toEqual(returnOject);
    expect(mockRefundRepository.getTotalRefundedAmount).toHaveBeenCalledWith(
      orderId,
    );
  });

  it('should throw an error when get total refunded amount method fails', async () => {
    const orderId: number = 1;

    // Simulate a failure when calling the repository
    mockRefundRepository.getTotalRefundedAmount.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getTotalRefundedAmount(orderId);
    expect(result).rejects.toThrow('Repository error');
  });
});
