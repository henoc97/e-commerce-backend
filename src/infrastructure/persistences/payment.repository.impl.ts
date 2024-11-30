import { Payment } from 'src/domain/entities/payment.entity';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { IPaymentRepository } from 'src/domain/repositories/payment.repository';
import { fromPaymentPrisma } from 'src/application/helper/from-prisma/to.payment.entity';
import prisma from 'prisma/prisma.service';

export class PaymentRepository implements IPaymentRepository {


  /**
   * Creates a new payment record in the database.
   * @param payment - The payment details to be created.
   * @returns A promise that resolves to the created Payment object.
   * @throws Error if the creation fails.
   */
  async create(payment: Payment): Promise<Payment> {
    try {
      const { id, order, ...data } = payment;
      const createdPayment = await prisma.payment.create({
        data: data,
      });
      return fromPaymentPrisma(createdPayment);
    } catch (error) {
      throw new Error(`Failed to create payment: ${error}`);
    }
  }

  /**
   * Retrieves a payment by its unique identifier.
   * @param id - The unique identifier of the payment.
   * @returns A promise that resolves to the Payment object or null if not found.
   * @throws Error if the retrieval fails.
   */
  async getById(id: number): Promise<Payment | null> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id },
      });
      return fromPaymentPrisma(payment);
    } catch (error) {
      throw new Error(`Failed to retrieve payment by id: ${error}`);
    }
  }

  /**
   * Updates a payment record with the provided updates.
   * @param id - The unique identifier of the payment to update.
   * @param updates - The partial payment details to update.
   * @returns A promise that resolves to the updated Payment object.
   * @throws Error if the update fails.
   */
  async update(id: number, updates: Partial<Payment>): Promise<Payment> {
    try {
      const { id, order, ...data } = updates;
      const updatedPayment = await prisma.payment.update({
        where: { id },
        data: data,
      });
      return fromPaymentPrisma(updatedPayment);
    } catch (error) {
      throw new Error(`Failed to update payment: ${error}`);
    }
  }

  /**
   * Deletes a payment record by its unique identifier.
   * @param id - The unique identifier of the payment to delete.
   * @returns A promise that resolves to true if deletion was successful, or false otherwise.
   * @throws Error if the deletion fails.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.payment.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(`Failed to delete payment: ${error}`);
      return true;
    }
  }

  /**
   * Retrieves all payments associated with a specific order ID.
   * @param orderId - The unique identifier of the order.
   * @returns A promise that resolves to an array of Payment objects.
   * @throws Error if the retrieval fails.
   */
  async getByOrderId(orderId: number): Promise<Payment[]> {
    try {
      const payments = await prisma.payment.findMany({
        where: { orderId },
      });
      return payments?.map(fromPaymentPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve payments by order ID: ${error}`,
      );
    }
  }

  /**
   * Retrieves all payments made using a specific payment method.
   * @param method - The payment method used.
   * @returns A promise that resolves to an array of Payment objects.
   * @throws Error if the retrieval fails.
   */
  async getByMethod(method: string): Promise<Payment[]> {
    try {
      const payments = await prisma.payment.findMany({
        where: { method },
      });
      return payments?.map(fromPaymentPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve payments by method: ${error}`,
      );
    }
  }

  /**
   * Retrieves all payments with a specific status.
   * @param status - The payment status to filter by.
   * @returns A promise that resolves to an array of Payment objects.
   * @throws Error if the retrieval fails.
   */
  async getByStatus(status: PaymentStatus): Promise<Payment[]> {
    try {
      const payments = await prisma.payment.findMany({
        where: { status },
      });
      return payments?.map(fromPaymentPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve payments by status: ${error}`,
      );
    }
  }

  /**
   * Retrieves all payments made within a specified date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of Payment objects.
   * @throws Error if the retrieval fails.
   */
  async getByDateRange(startDate: Date, endDate: Date): Promise<Payment[]> {
    try {
      const payments = await prisma.payment.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return payments?.map(fromPaymentPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve payments by date range: ${error}`,
      );
    }
  }

  /**
   * Retrieves the total amount of payments made within a specified date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to the total amount of payments.
   * @throws Error if the retrieval fails.
   */
  async getTotalAmountByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    try {
      const totalAmount = await prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return totalAmount._sum.amount ?? 0;
    } catch (error) {
      throw new Error(
        `Failed to retrieve total amount by date range: ${error}`,
      );
    }
  }

  /**
   * Retrieves the most recent payment made for a specific order.
   * @param orderId - The unique identifier of the order.
   * @returns A promise that resolves to the most recent Payment object or null if not found.
   * @throws Error if the retrieval fails.
   */
  async getMostRecentPaymentByOrderId(
    orderId: number,
  ): Promise<Payment | null> {
    try {
      const recentPayment = await prisma.payment.findFirst({
        where: { orderId },
        orderBy: { createdAt: 'desc' },
      });
      return fromPaymentPrisma(recentPayment);
    } catch (error) {
      throw new Error(
        `Failed to retrieve most recent payment by order ID: ${error}`,
      );
    }
  }

  /**
   * Retrieves payments grouped by payment method.
   * @returns A promise that resolves to a map of payment methods to arrays of Payment objects.
   * @throws Error if the retrieval fails.
   */
  async getPaymentsGroupedByMethod(): Promise<Map<string, Payment[]>> {
    try {
      const payments = await prisma.payment.findMany();
      const groupedPayments = new Map<string, Payment[]>();

      payments.forEach((payment) => {
        const method = payment.method;
        if (!groupedPayments.has(method)) {
          groupedPayments.set(method, []);
        }
        groupedPayments.get(method)?.push(fromPaymentPrisma(payment));
      });

      return groupedPayments;
    } catch (error) {
      throw new Error(`Failed to group payments by method: ${error}`);
    }
  }
}
