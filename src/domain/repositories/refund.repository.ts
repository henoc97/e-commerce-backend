import { Refund } from '../entities/refund.entity';
import { RefundStatus } from '../enums/refund-status.enum';

/**
 * Repository interface for managing refunds with enhanced business logic.
 */
export interface IRefundRepository {
  /**
   * Creates a new refund.
   * @param refund - The refund to be created.
   * @returns The created refund.
   */
  create(refund: Refund): Promise<Refund>;

  /**
   * Retrieves a refund by its ID.
   * @param id - The ID of the refund.
   * @returns The refund if found, or null.
   */
  getById(id: number): Promise<Refund | null>;

  /**
   * Retrieves all refunds for a specific order.
   * @param orderId - The ID of the order.
   * @returns A list of refunds for the order.
   */
  getByOrder(orderId: number): Promise<Refund[]>;

  /**
   * Updates a refund's details.
   * @param id - The ID of the refund.
   * @param updates - The fields to update.
   * @returns The updated refund.
   */
  modify(id: number, updates: Partial<Refund>): Promise<Refund>;

  /**
   * Deletes a refund.
   * @param id - The ID of the refund.
   * @returns True if the deletion was successful, false otherwise.
   */
  remove(id: number): Promise<boolean>;

  /**
   * Checks if a refund is eligible for processing.
   * @param refund - The refund to check.
   * @returns True if the refund is eligible, false otherwise.
   */
  isEligible(refund: Refund): boolean;

  /**
   * Processes a refund by updating its status.
   * @param id - The ID of the refund.
   * @param status - The new status.
   * @returns The updated refund.
   */
  process(id: number, status: RefundStatus): Promise<Refund>;

  /**
   * Retrieves refunds by status.
   * @param status - The status to filter refunds by.
   * @returns A list of refunds with the specified status.
   */
  getByStatus(status: RefundStatus): Promise<Refund[]>;

  /**
   * Cancels a refund if it has not been processed yet.
   * @param id - The ID of the refund.
   * @returns The canceled refund.
   */
  cancel(id: number): Promise<Refund>;

  /**
   * Approves a refund after validation.
   * @param id - The ID of the refund to approve.
   * @returns The approved refund.
   */
  approve(id: number): Promise<Refund>;

  /**
   * Issues a partial refund.
   * @param id - The ID of the refund to be partially refunded.
   * @param amount - The amount to refund.
   * @returns The updated refund reflecting the partial refund.
   */
  issuePartial(id: number, amount: number): Promise<Refund>;

  /**
   * Retrieves the total amount refunded for a specific order.
   * @param orderId - The ID of the order.
   * @returns The total refunded amount.
   */
  getTotalRefunded(orderId: number): Promise<number>;
}
