import { Refund } from 'src/domain/entities/refund.entity';
import { RefundStatus } from 'src/domain/enums/refund-status.enum';
import { IRefundRepository } from 'src/domain/repositories/refund.repository';

/**
 * Service for managing refunds.
 * Implements business logic related to refund processing.
 */
export class RefundService {
  private readonly refundRepository: IRefundRepository;

  /**
   * Creates an instance of RefundService.
   * @param refundRepository - The repository for managing refunds.
   */
  constructor(refundRepository: IRefundRepository) {
    this.refundRepository = refundRepository;
  }

  /**
   * Creates a new refund.
   * @param refund - The refund details to be created.
   * @returns The created refund.
   */
  async createRefund(refund: Refund): Promise<Refund> {
    return await this.refundRepository.create(refund);
  }

  /**
   * Retrieves a refund by its ID.
   * @param id - The ID of the refund to retrieve.
   * @returns The refund if found, or null if not found.
   */
  async getRefundById(id: number): Promise<Refund | null> {
    return await this.refundRepository.getById(id);
  }

  /**
   * Retrieves all refunds associated with a specific order.
   * @param orderId - The ID of the order for which to retrieve refunds.
   * @returns A list of refunds for the specified order.
   */
  async getRefundsByOrder(orderId: number): Promise<Refund[]> {
    return await this.refundRepository.getByOrder(orderId);
  }

  /**
   * Updates a refund's details.
   * @param id - The ID of the refund to update.
   * @param updates - The fields to update in the refund.
   * @returns The updated refund.
   */
  async updateRefund(id: number, updates: Partial<Refund>): Promise<Refund> {
    return await this.refundRepository.modify(id, updates);
  }

  /**
   * Deletes a refund by its ID.
   * @param id - The ID of the refund to delete.
   * @returns True if the deletion was successful, false otherwise.
   */
  async deleteRefund(id: number): Promise<boolean> {
    return await this.refundRepository.remove(id);
  }

  /**
   * Checks if a refund is eligible for processing.
   * @param refund - The refund to check for eligibility.
   * @returns True if the refund is eligible, false otherwise.
   */
  isRefundEligible(refund: Refund): boolean {
    return this.refundRepository.isEligible(refund);
  }

  /**
   * Processes a refund by updating its status.
   * @param id - The ID of the refund to process.
   * @param status - The new status of the refund.
   * @returns The updated refund.
   */
  async processRefund(id: number, status: RefundStatus): Promise<Refund> {
    return await this.refundRepository.process(id, status);
  }

  /**
   * Retrieves refunds by their status.
   * @param status - The status to filter refunds by.
   * @returns A list of refunds with the specified status.
   */
  async getRefundsByStatus(status: RefundStatus): Promise<Refund[]> {
    return await this.refundRepository.getByStatus(status);
  }

  /**
   * Cancels a refund if it has not been processed yet.
   * @param id - The ID of the refund to cancel.
   * @returns The canceled refund.
   */
  async cancelRefund(id: number): Promise<Refund> {
    return await this.refundRepository.cancel(id);
  }

  /**
   * Approves a refund after validation.
   * @param id - The ID of the refund to approve.
   * @returns The approved refund.
   */
  async approveRefund(id: number): Promise<Refund> {
    return await this.refundRepository.approve(id);
  }

  /**
   * Issues a partial refund for a specific refund ID.
   * @param id - The ID of the refund to partially refund.
   * @param amount - The amount to be refunded partially.
   * @returns The updated refund reflecting the partial refund.
   */
  async issuePartialRefund(id: number, amount: number): Promise<Refund> {
    return await this.refundRepository.issuePartial(id, amount);
  }

  /**
   * Retrieves the total amount refunded for a specific order.
   * @param orderId - The ID of the order for which to retrieve the total refunded amount.
   * @returns The total amount refunded for the specified order.
   */
  async getTotalRefundedAmount(orderId: number): Promise<number> {
    return await this.refundRepository.getTotalRefunded(orderId);
  }
}
