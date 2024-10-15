import { PrismaService } from 'prisma/prisma.service';
import { fromRefundPrisma } from 'src/application/helper/from-prisma/to.refund.entity';
import { Refund } from 'src/domain/entities/refund.entity';
import { RefundStatus } from 'src/domain/enums/refund-status.enum';
import { IRefundRepository } from 'src/domain/repositories/refund.repository';

export class RefundRepository implements IRefundRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  /**
   * Creates a new refund record in the database.
   * @param refund - The refund entity to be created.
   * @returns The created refund.
   */
  async create(refund: Refund): Promise<Refund> {
    try {
      const { id, order, ...data } = refund;
      const createdRefund = await this.prisma.refund.create({
        data: data,
      });
      return fromRefundPrisma(createdRefund);
    } catch (error) {
      console.error('Error creating refund:', error);
      throw new Error('Unable to create refund, error: ' + error);
    }
  }

  /**
   * Fetches a refund by its ID.
   * @param id - The ID of the refund.
   * @returns The refund or null if not found.
   */
  async getById(id: number): Promise<Refund | null> {
    try {
      const result = await this.prisma.refund.findUnique({
        where: { id },
        include: { order: true },
      });
      return fromRefundPrisma(result);
    } catch (error) {
      console.error(`Error fetching refund with id ${id}:`, error);
      throw new Error('Unable to fetch refund, error: ' + error);
    }
  }

  /**
   * Retrieves refunds associated with a particular order.
   * @param orderId - The ID of the order.
   * @returns An array of refunds associated with the order.
   */
  async getByOrder(orderId: number): Promise<Refund[]> {
    try {
      const result = await this.prisma.refund.findMany({
        where: { orderId },
      });
      return result.map(fromRefundPrisma);
    } catch (error) {
      console.error(`Error fetching refunds for order ${orderId}:`, error);
      throw new Error('Unable to fetch refunds, error: ' + error);
    }
  }

  /**
   * Modifies an existing refund.
   * @param id - The ID of the refund to update.
   * @param updates - The fields to update in the refund.
   * @returns The updated refund.
   */
  async modify(id: number, updates: Partial<Refund>): Promise<Refund> {
    try {
      const { id, order, ...data } = updates;
      const result = await this.prisma.refund.update({
        where: { id },
        data: data,
      });
      return fromRefundPrisma(result);
    } catch (error) {
      console.error(`Error updating refund with id ${id}:`, error);
      throw new Error('Unable to update refund, error: ' + error);
    }
  }

  /**
   * Deletes a refund by its ID.
   * @param id - The ID of the refund to delete.
   * @returns True if deletion was successful, false otherwise.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.refund.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(`Error deleting refund with id ${id}:`, error);
      return false;
    }
  }

  /**
   * Checks if a refund is eligible based on certain business rules.
   * @param refund - The refund entity to check.
   * @returns True if the refund is eligible, false otherwise.
   */
  async isEligible(eligibleDays: number, refund: Refund): Promise<boolean> {
    // Example eligibility logic: refunds can only be issued within 30 days of purchase.
    const thirtyDays = eligibleDays * 24 * 60 * 60 * 1000; // e.g. 30 days in milliseconds
    const now = new Date();
    const refuundReceived = await this.getById(refund.id);
    return (
      now.getTime() - refuundReceived.order.createdAt.getTime() <= thirtyDays
    );
  }

  /**
   * Processes a refund by updating its status.
   * @param id - The ID of the refund to process.
   * @param status - The new status of the refund.
   * @returns The updated refund with the new status.
   */
  async process(id: number, status: RefundStatus): Promise<Refund> {
    try {
      const result = await this.prisma.refund.update({
        where: { id },
        data: { status },
      });
      return fromRefundPrisma(result);
    } catch (error) {
      console.error(`Error processing refund with id ${id}:`, error);
      throw new Error('Unable to process refund, error: ' + error);
    }
  }

  /**
   * Retrieves refunds by their status (e.g., PENDING, APPROVED, REJECTED).
   * @param status - The status of the refunds to retrieve.
   * @returns An array of refunds with the specified status.
   */
  async getByStatus(status: RefundStatus): Promise<Refund[]> {
    try {
      const result = await this.prisma.refund.findMany({
        where: { status },
      });
      return result.map(fromRefundPrisma);
    } catch (error) {
      console.error(`Error fetching refunds with status ${status}:`, error);
      throw new Error('Unable to fetch refunds, error: ' + error);
    }
  }

  /**
   * Cancels a refund by updating its status to "CANCELLED".
   * @param id - The ID of the refund to cancel.
   * @returns The updated refund with a "CANCELLED" status.
   */
  async cancel(id: number): Promise<Refund> {
    try {
      return await this.process(id, RefundStatus.CANCELLED);
    } catch (error) {
      console.error(`Error cancelling refund with id ${id}:`, error);
      throw new Error('Unable to cancel refund, error: ' + error);
    }
  }

  /**
   * Approves a refund by updating its status to "APPROVED".
   * @param id - The ID of the refund to approve.
   * @returns The updated refund with an "APPROVED" status.
   */
  async approve(id: number): Promise<Refund> {
    try {
      return await this.process(id, RefundStatus.APPROVED);
    } catch (error) {
      console.error(`Error approving refund with id ${id}:`, error);
      throw new Error('Unable to approve refund, error: ' + error);
    }
  }

  /**
   * Issues a partial refund by reducing the refund amount and updating its status.
   * @param id - The ID of the refund to partially refund.
   * @param amount - The amount to refund.
   * @returns The updated refund with the adjusted amount.
   */
  async issuePartial(id: number, amount: number): Promise<Refund> {
    try {
      const refund = await this.getById(id);
      if (!refund) throw new Error('Refund not found, error: ');

      const updatedRefund = await this.prisma.refund.update({
        where: { id },
        data: { amount },
      });
      return fromRefundPrisma(updatedRefund);
    } catch (error) {
      console.error(`Error issuing partial refund for id ${id}:`, error);
      throw new Error('Unable to issue partial refund, error: ' + error);
    }
  }

  /**
   * Calculates the total refunded amount for a specific order.
   * @param orderId - The ID of the order.
   * @returns The total refunded amount for the order.
   */
  async getTotalRefunded(orderId: number): Promise<number> {
    try {
      const refunds = await this.prisma.refund.findMany({
        where: { orderId },
      });
      return refunds.reduce((total, refund) => total + refund.amount, 0);
    } catch (error) {
      console.error(
        `Error calculating total refund for order ${orderId}:`,
        error,
      );
      throw new Error('Unable to calculate total refund, error: ' + error);
    }
  }
}
